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

The AI is Chrome's built-in, on-device model (Prompt API). It is free, needs no API key, and sends nothing over the network. There is no AI backend.

- **Product decisions:**
  - Only the free built-in AI is supported. Don't add paid providers or API key fields.
  - The AI is English only. Greek support was removed on purpose.
- **Request flow:** View → `useAI().improve()` (`src/hooks/useAI`) → `improveText` (`src/services/aiService.ts`) → `browserProvider` (`src/services/providers/browserProvider.ts`).
- **`improve(promptKey, input, validatorType, { jobTitle, onPartial })`:**
  1. `resolveJobTitle` asks the AI which profession the title or keyword points to (e.g. "React" → "React Developer"). If it finds none, it shows the invalid-title dialog. Results are cached per title.
  2. The AI writes the text from that profession. Pass `input` as a function `(profession) => string`. `onPartial` streams the text into the field.
  3. A second AI call checks the result (`validateAIResult` / `validateAchievementsResult`). Skills are checked locally with `parseSkillList` instead.
- **Prompts** live in `src/services/aiPrompts.ts`. The job title rules must stay general: never add special cases for specific words. Few-shot examples are fine, but they must not be the words being tested.
- **Structured output:**
  - Pass `choices` (an enum of words) or `responseSchema` (JSON Schema) to force the reply's shape.
  - Parse leniently. `isValidVerdict` handles quoted or extra text, and `resolveJobTitle` falls back to the user's title when the JSON can't be read.
- **Rewrite rules** (Smart Rewrite, Generate Achievements):
  - Clear the field, then write from the title only.
  - On failure, restore the previous text only if it was written for the same title (`useTextTitles`).
  - Clearing a title clears its text.
- **Sessions:** `browserProvider` keeps one base session per prompt and clones it per request. Keep prompts constant (no per-request text in the system prompt) so the cache works.
- **Debugging:** in development, the console logs each title's resolution (`[AI] Job title: ...`) and per-step timings (`[AI] smartRewrite: ...ms`).

## Performance

Measured with Playwright: about 5-7 ms of JavaScript per key press, and a main bundle of 639 KB. Keep these patterns:

- `ResumePreview` is memoized and fed through `useDeferredValue` in `ResumePreviewView`, so it never blocks typing.
- `WorkExperienceEntryCard` is memoized. Callbacks passed to it must be stable: read the latest state with `useAppStore().getState()` rather than closing over `entries`.
- Heavy libraries that are only needed on demand are loaded with dynamic `import()`. `html2canvas` and `jspdf` load only on PDF export.
- Import single lodash functions (`lodash/isEqual`), never the whole package.

## Code style

- TypeScript, function components, hooks. Match the surrounding code: JSDoc on exported functions, and short comments that explain *why*.
- Use plain hyphens (`-`), not em dashes (`—`), in code, comments and UI text.
- Most files use CRLF line endings. Keep a file's existing line endings when editing it.
- Don't leave `console.log` calls. Use `console.info` guarded by `import.meta.env.DEV` for intentional debug output.
