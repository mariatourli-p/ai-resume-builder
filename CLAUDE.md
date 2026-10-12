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
- **UI text.** All user-facing strings live in `src/locale/en/en-tokens.ts`. Don't hard-code text in components.

## AI

The AI is Gemini Nano, the model built into Chrome, used through the Prompt API (the global `LanguageModel`). It is free and runs on the user's computer. There is nothing to configure on Google's side: no account, API key, cloud project or backend. The model downloads once into Chrome and nothing is sent over the network. The README section "Behind the scenes" explains the whole flow.

- **Product decisions:**
  - Only the free built-in AI is supported. Don't add paid providers or API key fields.
  - The AI is English only (`expectedInputs`/`expectedOutputs` are English text). Greek support was removed on purpose.
- **Where `LanguageModel` is touched:** only in `src/services/providers/browserProvider.ts`. Everything else goes through its exports:
  - `getBrowserAIAvailability()` - `availability()`; runs once on app start in `AISettingsProvider`. It returns `"unsupported_browser"` when there is no `LanguageModel`.
  - `prepareBrowserAI()` - an empty `create()` from the Settings download button, to start the one-time download (Chrome needs a user click).
  - `onBrowserAIDownloadProgress()` - the `monitor`'s `downloadprogress` events, for the progress bar and toast.
  - `browserProvider.generate()` - every text request.
- **Call sites:** the only views that generate text are `PersonalInfoFormView.onSmartRewrite`, `WorkExperienceFormView.onGenerateAchievements` and `SkillsFormView.handleSuggest`. Each starts with `if (!requireAIProvider()) return;`, which opens the `aiError` dialog from `AISettingsProvider`'s `unsupportedReason`.
- **Request flow:** View → `useAI().improve()` (`src/hooks/useAI`) → `improveText` (`src/services/aiService.ts`) → `browserProvider.generate` → `LanguageModel`.
- **`improve(promptKey, input, validatorType, { jobTitle, onPartial })`** makes up to 3 model calls:
  1. `resolveJobTitle` asks the AI which profession the title or keyword points to (e.g. "React" → "React Developer"). If it finds none, it shows the invalid-title dialog. Results are cached per lowercased title until reload.
  2. The AI writes the text from that profession. Pass `input` as a function `(profession) => string`. `onPartial` streams the text into the field.
  3. A second AI call checks the result (`validateAIResult` / `validateAchievementsResult`, forced to `VALID`/`INVALID`). Skills are checked locally with `parseSkillList` instead.
- **`generate` has three paths:**
  - `choices` (enum) or `responseSchema` (JSON Schema) → `session.prompt(text, { responseConstraint })`. Used by `resolveJobTitle` and the validators.
  - `onChunk` → `session.promptStreaming(text)`. Used by Smart Rewrite and Generate Achievements.
  - neither → `session.prompt(text)`. Used by Suggest skills.
- **Prompts** live in `src/services/aiPrompts.ts` (the achievements validator prompt is in `validateAchievementsResult`). The job title rules must stay general: never add special cases for specific words. Few-shot examples are fine, but they must not be the words being tested.
- **Parse leniently.** `isValidVerdict` handles quoted or extra text, and `resolveJobTitle` falls back to the user's title when the JSON can't be read.
- **Rewrite rules** (Smart Rewrite, Generate Achievements):
  - Clear the field, then write from the title. Generate Achievements also sends the role title as written (all its keywords) and the text the user wrote in the field for that title; the AI's own earlier bullets are not sent back.
  - On failure, always restore the text from before the click: the AI never deletes the user's text without writing a new one.
  - Editing or deleting a title keeps its text (the user may be retyping it); only the AI button replaces it.
- **Sessions:** `browserProvider` creates one base session per system prompt (`availability()` check, then `create({ initialPrompts })`), caches it, and runs each request on a `clone()` that is destroyed afterwards. A failed base session is removed from the cache so the next click retries. Keep prompts constant (no per-request text in the system prompt) so the cache works.
- **Errors:** `AIProviderError` codes `unsupported` (no `LanguageModel`), `unsupported_device` (Chrome says `unavailable`) and `request_failed` open the `aiError` dialog. A rejected title or an `INVALID` check opens the `moreContext` dialog.
- **Debugging:** in development, the console logs each title's resolution (`[AI] Job title: ...`) and per-step timings (`[AI] smartRewrite: ...ms`). `chrome://on-device-internals` shows the model's status in Chrome.

## Performance

Measured with Playwright: about 5-7 ms of JavaScript per key press, and a main bundle of 639 KB. Keep these patterns:

- `ResumePreview` is memoized and fed through `useDeferredValue` in `ResumePreviewView`, so it never blocks typing.
- `WorkExperienceEntryCard` is memoized. Callbacks passed to it must be stable: read the latest state with `useAppStore().getState()` rather than closing over `entries`.
- Heavy libraries that are only needed on demand are loaded with dynamic `import()`. `html2canvas` and `jspdf` load only on PDF export.
- Import single lodash functions (`lodash/isEqual`), never the whole package.

## Code style

- TypeScript, function components, hooks. Match the surrounding code: JSDoc on exported functions, and short comments that explain *why*.
- Comments longer than one line use `/** */` blocks, never several `//` lines. Single-line comments use `//` (or `{/* */}` inside JSX).
- Functions inside views get a `/** */` comment that says when they run and why they exist.
- Name functions `setX` only when they are real `useState` setters. Other helpers are named by what they do (`updateSummary`, `findEntry`).
- Use plain hyphens (`-`), not em dashes (`—`), in code, comments and UI text.
- Most files use CRLF line endings. Keep a file's existing line endings when editing it.
- Don't leave `console.log` calls. Use `console.info` guarded by `import.meta.env.DEV` for intentional debug output.
