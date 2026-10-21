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
- **Privacy and licenses.** The README section "Privacy: what leaves the browser" lists every piece of data and where it goes; update it and the footer whenever that changes. The app sets no cookies, has no analytics and sends nothing over the network (fonts are self-hosted with `@fontsource`, not loaded from Google), so it needs no cookie banner; `AppFooter` says so. Keep it that way, or the footer text and the need for consent change. `build.license` writes the bundled packages' licenses to `dist/licenses.md` (their licenses ask for the full texts to ship with the app); the footer's `LicensesDialog` summarizes them. Only add packages, fonts and icons with permissive licenses (MIT, ISC, Apache, BSD, OFL).
- **UI text.** All user-facing strings live in `src/locale/en/en-tokens.ts`, including field labels and the resume's headings. Don't hard-code text in components.

## AI

The AI is Gemini Nano, the model built into Chrome, used through the Prompt API (the global `LanguageModel`). It is free and runs on the user's computer. There is nothing to configure on Google's side: no account, API key, cloud project or backend. The model downloads once into Chrome and nothing is sent over the network. The README section "Behind the scenes" explains the whole flow.

- **Product decisions:**
  - Only the free built-in AI is supported. Don't add paid providers or API key fields.
  - No online AI. An online Gemini API version was built and removed on purpose: Google's free tier may not be offered to users in the EEA, Switzerland or the UK (most users are in Greece), and on the free tier Google may use what is sent and human reviewers may read it. Don't add it back.
  - The AI is English only (`expectedInputs`/`expectedOutputs` are English text). Greek support was removed on purpose.
- **Where `LanguageModel` is touched:** only in `src/services/providers/browserProvider.ts`. Everything else goes through its exports:
  - `getBrowserAIAvailability()` - `availability()`; runs once on app start in `AISettingsProvider`. It returns `"unsupported_browser"` when there is no `LanguageModel`.
  - `prepareBrowserAI()` - an empty `create()` from the Settings download button, to start the one-time download (Chrome needs a user click).
  - `onBrowserAIDownloadProgress()` - the `monitor`'s `downloadprogress` events, for the progress bar and toast.
  - `browserProvider.generate()` - every text request.
- **Call sites:** the only views that generate text are `PersonalInfoFormView.onSmartRewrite`, `WorkExperienceFormView.onGenerateAchievements` (Work Experience and Volunteering) and `SkillsFormView.handleSuggest`. Each starts with `if (!ensureAIAvailable()) return;`, which opens the `aiError` dialog from `AISettingsProvider`'s `unsupportedReason`.
- **Request flow:** View → `useAI().improve()` (`src/hooks/useAI`) → `askAI` (`src/services/aiService.ts`) → `browserProvider.generate` → `LanguageModel`.
- **`improve(promptKey, input, validatorType, { jobTitle })`** makes up to 3 model calls:
  1. `resolveJobTitle` asks the AI which profession the title or keyword points to (e.g. "React" → "React Developer"). If it finds none, it shows the invalid-title dialog. Results are cached per lowercased title until reload.
  2. The AI writes the text from that profession. Pass `input` as a function `(profession) => string`.
  3. A second AI call checks the result (`validateAIResult` / `validateAchievementsResult`, forced to `VALID`/`INVALID`). Skills are checked locally with `parseSkillList` instead.
  `improve` returns the text only after the check passed, and only then does the view put it in the field. There is no streaming: a text that fails the check is never shown.
- **`generate` has two paths:**
  - `choices` (enum) or `responseSchema` (JSON Schema) → `session.prompt(text, { responseConstraint })`. Used by `resolveJobTitle` and the validators.
  - neither → `session.prompt(text)`. Used by Smart Rewrite, Generate Achievements and Suggest skills.
- **Prompts** live in `src/services/aiPrompts.ts`, all of them. The job title rules must stay general: never add special cases for specific words. Few-shot examples are fine, but they must not be the words being tested.
- **Parse leniently.** `isValidVerdict` handles quoted or extra text, and `resolveJobTitle` falls back to the user's title when the JSON can't be read.
- **Rewrite rules** (Smart Rewrite, Generate Achievements):
  - Write a new text from the title; the field keeps the user's text until the new one passed the check. Generate Achievements also sends the role title as written (all its keywords) and the text the user wrote in the field for that title; the AI's own earlier bullets are not sent back. Each card saves `isAIWritten` and `achievementsRole` (set by `updateAchievements` and by edits to the field), so this holds after a reload, and text written for a different role title is not sent either: after a role change only the role is sent.
  - Volunteering uses `generateVolunteeringAchievements` and skips `resolveJobTitle`: its titles are often a cause or an area ("Advocacy & Awareness"), not a profession. It sends the role as written, the organization and the user's notes. Instead, `findVolunteerArea` (`VOLUNTEER_AREA_PROMPT`) first asks the AI for the area of the work (e.g. "Health and safety") from the role and organization (not the notes), and sends it as `Area of work`. With no area it shows the `invalidVolunteerWork` message. Naming an area is more reliable for the small model than a yes/no check.
  - On failure the field is never touched: the AI never deletes the user's text without writing a new one.
  - Editing or deleting a title keeps its text (the user may be retyping it); only the AI button replaces it.
- **Sessions:** `browserProvider` creates one base session per system prompt (`availability()` check, then `create({ initialPrompts })`), caches it, and runs each request on a `clone()` that is destroyed afterwards. A failed base session is removed from the cache so the next click retries. Keep prompts constant (no per-request text in the system prompt) so the cache works.
- **Errors:** `AIProviderError` codes `unsupported` (no `LanguageModel`), `unsupported_device` (Chrome says `unavailable`), `download_failed` (the first `create()` fails while the model isn't on the computer yet) and `request_failed` open the `aiError` dialog. A rejected title or volunteer role, or an `INVALID` check, opens the `moreContext` dialog. The header's `AIStatusBadge` (`useAIStatusBadge`) always shows the AI status, with the reason on hover.
- **Debugging:** in development, the console logs each title's resolution (`[AI] Job title: ...`) per-step timings (`[AI] smartRewrite: ...ms`) and each failed request (`[AI] Request failed`, with the error). `chrome://on-device-internals` shows the model's status in Chrome.

## Performance

Measured with Playwright on a production build with a full resume (5 jobs, 2 volunteering roles, 3 degrees, 4 courses, 20 skills, a photo): about 7-8 ms of JavaScript per key press on desktop and 40-50 ms on a phone (CPU slowed 4x). The main bundle is 656 KB. Keep these patterns:

- `ResumePreview` is memoized and fed through `useDeferredValue` in `ResumePreviewView`, so it never blocks typing. Its entry items and section headings are memoized too, so a key press re-renders only the entry being edited.
- On mobile the off-screen preview is mounted only while Export PDF captures it (`flushSync` in the export function), not on every key press.
- `MonthField` (the MUI date picker) is memoized. Give it the card's id as `name` and a stable `onChange(value, name)` from the view (`onStartDateChange` / `onEndDateChange`). A new function per card makes every key press in the card re-render both pickers. Presentational components don't create callbacks with `useCallback`; the view passes them down.
- Create `Intl` formatters once at module level (see `formatDateRange`). `toLocaleDateString` with options builds a new formatter on every call.
- `WorkExperienceEntryCard` is memoized. Callbacks passed to it must be stable: read the latest state with `useAppStore().getState()` rather than closing over `entries`.
- Heavy libraries that are only needed on demand are loaded with dynamic `import()`. `html2canvas` and `jspdf` load only on PDF export. The MUI date picker (`Forms/MonthField`) loads with `lazy()` after the page.

## Code style

- TypeScript, function components, hooks. Match the surrounding code: JSDoc on exported functions, and short comments that explain *why*.
- Every folder with modules has an `index.ts` barrel (`export * from "./X";` per module; add `export { default }` for `lazy()` targets). Import a folder through its barrel (`@/redux`, `@/routes/AISettings`), never a file inside another folder; inside a folder, import siblings by relative path, not through its own barrel, to avoid import cycles. A provider gets its own folder with its context, provider and hook (`routes/AISettings/AISettingsProvider`).
- Comments longer than one line use `/** */` blocks, never several `//` lines. Single-line comments use `//` (or `{/* */}` inside JSX).
- Functions inside views get a `/** */` comment that says when they run and why they exist.
- Name functions `setX` only when they are real `useState` setters. Other helpers are named by what they do (`updateSummary`, `findEntry`).
- Use plain hyphens (`-`), not em dashes (`—`), in code, comments and UI text.
- Most files use CRLF line endings. Keep a file's existing line endings when editing it.
- Don't leave `console.log` calls. Use `console.info` guarded by `import.meta.env.DEV` for intentional debug output.
