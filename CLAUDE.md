# CLAUDE.md

Guidance for working in this repository.

## Commands

```bash
npm run dev        # dev server
npm run build      # tsc -b && vite build - run before finishing any change
npm run lint       # eslint - run before finishing any change
npm run storybook  # Storybook on port 6006
```

There are no unit tests yet; Vitest runs the Storybook stories in Playwright (`npx vitest`). The VS Code task **Check (build + lint)** runs both checks.

## Architecture

- **Components vs views.** `src/components/` holds presentational components: props in, callbacks out, no Redux or AI calls, each with a `*.stories.tsx`. `src/routes/**/*View.tsx` connects them to Redux and the AI.
- **State.** Redux Toolkit slice in `src/redux/resume/resume-reducer.ts`, persisted to localStorage by redux-persist (key `resume_builder`). Read state with the selector hooks in `src/redux/selectors.ts`. Dialogs are opened with `toggleDialog({ type, message })` and rendered by `src/routes/Dialogs/ErrorDialogView`.
- **Mobile.** Below the `md` breakpoint `HomePageView` shows only the forms: the sections drawer opens from the header's menu button, and `ResumePreviewView offscreen` renders the preview off screen, because Export PDF captures it with html2canvas (it must stay in the page, never `display: none`). Form field grids use one column on `xs`.
- **Privacy and licenses.** The app sets no cookies and has no analytics (fonts are self-hosted with `@fontsource`, not loaded from Google), so it needs no cookie banner; `AppFooter` says so. The only network request is the online AI, and only after the user agreed in `CloudConsentDialog`. Keep it that way, or the footer text and the consent dialog must change. `build.license` writes the bundled packages' licenses to `dist/licenses.md` (their licenses ask for the full texts to ship with the app); the footer's `LicensesDialog` summarizes them. Only add packages, fonts and icons with permissive licenses (MIT, ISC, Apache, BSD, OFL).
- **UI text.** All user-facing strings live in `src/locale/en/en-tokens.ts`. Don't hard-code text in components.

## AI

There are two AIs, both free. The **online AI** is Google's Gemini API (free tier), called by the serverless function `api/generate.ts` (Vercel), which holds the key in `GEMINI_API_KEY` (model in `GEMINI_MODEL`, default `gemini-2.5-flash`). The **built-in AI** is Gemini Nano, the model built into Chrome, used through the Prompt API (the global `LanguageModel`); it runs on the user's computer and needs no key. The README section "Behind the scenes" explains the whole flow.

- **Product decisions:**
  - Online AI first, built-in AI as fallback. `askAI` tries `cloudProvider` when the user allowed it, and falls back to `browserProvider` when the online AI fails or answers 429 (after any failure it skips the online AI for a minute, so the other calls of a click don't wait for it again). With "Keep it on my computer" every request goes to the built-in AI.
  - Consent first: the first AI click opens `CloudConsentDialog` and waits for the answer; the choice is saved in localStorage (`resume_ai_cloud_consent`) and changed in Settings (`CloudAISwitch`). Never send anything online without it.
  - Send the online AI as little as possible: names, contact details, photo and organizations never leave the device. `cloudProvider` strips `Organization: ...` lines; the built-in AI still gets them.
  - Only free services. Don't add paid providers or API key fields in the app; the key lives only in Vercel's environment variables.
  - The AI is English only (`expectedInputs`/`expectedOutputs` are English text). Greek support was removed on purpose.
- **Serverless function** (`api/generate.ts`): accepts only the system prompts in `src/services/aiPrompts.ts` (so it isn't a free general-purpose AI) and texts up to 4,000 characters, limits each IP to 20 requests a minute (in memory, per instance), stores nothing and never logs the user's text, and answers `{ text }`, a plain-text stream, or an `ApiErrorBody` (`src/services/api/apiClient.ts`) with `429` (limit), `503` (no key), `400` or `502`. When Google fails it logs and returns only Google's status and reason (`upstreamStatus`, `reason`, e.g. `403 PERMISSION_DENIED`), not its message, which can name the Cloud project. Its schemas are converted to Gemini's capitalized types. It is type-checked by `tsconfig.node.json` and imports `../src/services/aiPrompts.js` with the `.js` extension, as Node's ES modules need.
- **Where `LanguageModel` is touched:** only in `src/services/providers/browserProvider.ts`. Everything else goes through its exports:
  - `getBrowserAIAvailability()` - `availability()`; runs once on app start in `AISettingsProvider`. It returns `"unsupported_browser"` when there is no `LanguageModel`.
  - `prepareBrowserAI()` - an empty `create()` from the Settings download button, to start the one-time download (Chrome needs a user click).
  - `onBrowserAIDownloadProgress()` - the `monitor`'s `downloadprogress` events, for the progress bar and toast.
  - `browserProvider.generate()` - every text request.
- **Call sites:** the only views that generate text are `PersonalInfoFormView.onSmartRewrite`, `WorkExperienceFormView.onGenerateAchievements` (Work Experience and Volunteering) and `SkillsFormView.handleSuggest`. Each starts with `if (!(await ensureAIAvailable())) return;`, which asks for consent the first time and, with "Keep it on my computer", opens the `aiError` dialog from `AISettingsProvider`'s `unsupportedReason`.
- **Request flow:** View → `useAI().improve()` (`src/hooks/useAI`) → `askAI` (`src/services/aiService.ts`) → `cloudProvider.generate` → `postGenerate` (`src/services/api`) → `/api/generate` → Gemini API, or `browserProvider.generate` → `LanguageModel`. `AISettingsProvider` tells `askAI` the user's choice with `allowCloudAI()`.
- **`improve(promptKey, input, validatorType, { jobTitle, onPartial })`** makes up to 3 model calls:
  1. `resolveJobTitle` asks the AI which profession the title or keyword points to (e.g. "React" → "React Developer"). If it finds none, it shows the invalid-title dialog. Results are cached per lowercased title until reload.
  2. The AI writes the text from that profession. Pass `input` as a function `(profession) => string`. `onPartial` streams the text into the field.
  3. A second AI call checks the result (`validateAIResult` / `validateAchievementsResult`, forced to `VALID`/`INVALID`). Skills are checked locally with `parseSkillList` instead.
- **`generate` has three paths** (both providers take the same `GenerateParams`):
  - `choices` (enum) or `responseSchema` (JSON Schema) → `session.prompt(text, { responseConstraint })`, or Gemini's `responseSchema`. Used by `resolveJobTitle` and the validators.
  - `onChunk` → `session.promptStreaming(text)`, or Gemini's `streamGenerateContent`. Used by Smart Rewrite and Generate Achievements.
  - neither → `session.prompt(text)`, or `generateContent`. Used by Suggest skills.
- **Prompts** live in `src/services/aiPrompts.ts`, all of them: the serverless function accepts only these, so a prompt anywhere else fails online. The job title rules must stay general: never add special cases for specific words. Few-shot examples are fine, but they must not be the words being tested.
- **Parse leniently.** `isValidVerdict` handles quoted or extra text, and `resolveJobTitle` falls back to the user's title when the JSON can't be read.
- **Rewrite rules** (Smart Rewrite, Generate Achievements):
  - Clear the field, then write from the title. Generate Achievements also sends the role title as written (all its keywords) and the text the user wrote in the field for that title; the AI's own earlier bullets are not sent back. Each card saves `isAIWritten` and `achievementsRole` (set by `updateAchievements` and by edits to the field), so this holds after a reload, and text written for a different role title is not sent either: after a role change only the role is sent.
  - Volunteering uses `generateVolunteeringAchievements` and skips `resolveJobTitle`: its titles are often a cause or an area ("Advocacy & Awareness"), not a profession. It sends the role as written, the organization and the user's notes. Instead, `findVolunteerArea` (`VOLUNTEER_AREA_PROMPT`) first asks the AI for the area of the work (e.g. "Health and safety") from the role and organization (not the notes), and sends it as `Area of work`. With no area it shows the `invalidVolunteerWork` message. Naming an area is more reliable for the small model than a yes/no check.
  - On failure, always restore the text from before the click: the AI never deletes the user's text without writing a new one.
  - Editing or deleting a title keeps its text (the user may be retyping it); only the AI button replaces it.
- **Sessions:** `browserProvider` creates one base session per system prompt (`availability()` check, then `create({ initialPrompts })`), caches it, and runs each request on a `clone()` that is destroyed afterwards. A failed base session is removed from the cache so the next click retries. Keep prompts constant (no per-request text in the system prompt) so the cache works.
- **Errors:** `AIProviderError` codes `unsupported` (no `LanguageModel`), `unsupported_device` (Chrome says `unavailable`), `download_failed` (the first `create()` fails while the model isn't on the computer yet), `cloud_limit` (the online AI is busy and there is no built-in AI to fall back to) and `request_failed` open the `aiError` dialog. A rejected title or volunteer role, or an `INVALID` check, opens the `moreContext` dialog. The header's `AIStatusBadge` (`useAIStatusBadge`) always shows the AI status (**Online AI** when allowed), with the reason on hover.
- **Debugging:** in development, the console logs each title's resolution (`[AI] Job title: ...`), per-step timings (`[AI] smartRewrite: ...ms`) and each fallback to the built-in AI. `npm run dev` has no serverless functions, so the online AI fails there and the built-in AI answers; use `vercel dev` to run `api/generate.ts` locally. `chrome://on-device-internals` shows the built-in model's status in Chrome.

## Performance

Measured with Playwright on a production build with a full resume (5 jobs, 2 volunteering roles, 3 degrees, 4 courses, 20 skills, a photo): about 7-8 ms of JavaScript per key press on desktop and 40-50 ms on a phone (CPU slowed 4x). The main bundle is 658 KB. Keep these patterns:

- `ResumePreview` is memoized and fed through `useDeferredValue` in `ResumePreviewView`, so it never blocks typing. Its entry items and section headings are memoized too, so a key press re-renders only the entry being edited.
- On mobile the off-screen preview is mounted only while Export PDF captures it (`flushSync` in the export function), not on every key press.
- `MonthField` (the MUI date picker) is memoized. Give it the card's id as `name` and a stable `onChange(value, name)` from the view (`onStartDateChange` / `onEndDateChange`). A new function per card makes every key press in the card re-render both pickers. Presentational components don't create callbacks with `useCallback`; the view passes them down.
- Create `Intl` formatters once at module level (see `formatDateRange`). `toLocaleDateString` with options builds a new formatter on every call.
- `WorkExperienceEntryCard` is memoized. Callbacks passed to it must be stable: read the latest state with `useAppStore().getState()` rather than closing over `entries`.
- Heavy libraries that are only needed on demand are loaded with dynamic `import()`. `html2canvas` and `jspdf` load only on PDF export. The MUI date picker (`Forms/MonthField`) loads with `lazy()` after the page.

## Code style

- TypeScript, function components, hooks. Match the surrounding code: JSDoc on exported functions, and short comments that explain *why*.
- Comments longer than one line use `/** */` blocks, never several `//` lines. Single-line comments use `//` (or `{/* */}` inside JSX).
- Functions inside views get a `/** */` comment that says when they run and why they exist.
- Name functions `setX` only when they are real `useState` setters. Other helpers are named by what they do (`updateSummary`, `findEntry`).
- Use plain hyphens (`-`), not em dashes (`—`), in code, comments and UI text.
- Most files use CRLF line endings. Keep a file's existing line endings when editing it.
- Don't leave `console.log` calls. Use `console.info` guarded by `import.meta.env.DEV` for intentional debug output.
