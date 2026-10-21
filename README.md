# AI Resume Builder

An AI-powered resume builder that helps anyone create a polished, professional resume in minutes - no design or writing skills required. The AI features are free: Google's Gemini online when the user allows it, or Chrome's built-in AI on the user's own computer.

> 🚧 This project is in active development. Features marked ✅ are implemented; the rest are planned.

## Requirements

The resume editor, preview and PDF export work in any modern browser. With the user's consent, **the AI runs online** (Google's Gemini) and works in any browser, phones included. Without it, or when the online AI is busy, **the AI features need Chrome's built-in AI**, which runs only on some computers:

| Requirement      | Details                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Browser          | A recent desktop version of Google Chrome. Safari, Firefox and phones are not supported. |
| Operating system | Windows 10/11, macOS 13+, Linux, or ChromeOS on a Chromebook Plus                        |
| Disk space       | At least 22 GB free, for the AI model Chrome downloads once                              |
| Hardware         | A graphics card with more than 4 GB of memory, or 16 GB of RAM and 4 CPU cores           |
| Network          | An unmetered connection for the first model download. After that the AI works offline.   |
| Language         | The AI writes in English only                                                            |

These requirements come from [Chrome's documentation][chrome-ai-requirements], and Google may change them. When the AI can't run, the app explains why and the rest of it keeps working.

### Good to know

- **The AI is provided by Google, not by this app.** Online it is the free tier of the [Gemini API][gemini-api]; on the device it is Gemini Nano, built into Chrome. Google decides the models, limits, browsers and devices, and may change them.
- **Check what the AI writes.** Its text can be wrong or invented. Users should review every suggestion before using it in a resume.
- **Google's rules apply.** Using the built-in AI is subject to Google's [Generative AI Prohibited Use Policy][google-ai-policy].
- **Privacy.** Resume data stays in the browser (localStorage). Before the first AI request the app asks where the AI may run. With the online AI, only the text the AI works on is sent to Google: titles, skills, the user's achievement notes and the AI's own text. Names, contact details, photos and organizations never are. On the Gemini API's free tier, Google may use that text to improve its products. With **Keep it on my computer**, nothing is sent.

---

## Current Status

| Feature                               | Status         |
| ------------------------------------- | -------------- |
| Project architecture & routing        | ✅ Done        |
| Component library (Storybook)         | ✅ Done        |
| Side panel UI & icons                 | ✅ Done        |
| Resume form inputs                    | ✅ Done        |
| Live preview                          | ✅ Done        |
| Autosave to localStorage              | ✅ Done        |
| PDF export                            | ✅ Done        |
| AI summary (Smart Rewrite)            | ✅ Done        |
| AI achievements for work experience   | ✅ Done        |
| AI skills suggestions                 | ✅ Done        |
| Profile photo                         | ✅ Done        |
| Work dates (month picker, "Present")  | ✅ Done        |
| Courses & Seminars, Volunteering      | ✅ Done        |
| Settings (accent color, AI status)    | ✅ Done        |
| AI for the Education section          | 📋 Planned     |
| "Optimize Resume" (all sections)      | 📋 Planned     |
| Multiple templates                    | 📋 Planned     |

---

## Overview

Users fill in their details section by section (Personal Info, Work Experience, Education, Skills, Courses & Seminars, Volunteering) and see the resume update live next to the form. The AI writes the professional summary, key achievements and skill suggestions from the user's job title, and the finished resume downloads as a PDF.

## Tech Stack

| Category       | Technology                                                |
| -------------- | --------------------------------------------------------- |
| Framework      | React 19 + TypeScript                                     |
| Build tool     | Vite                                                      |
| UI library     | MUI (Material UI) v9                                      |
| Styling        | MUI `sx`                                                  |
| Routing        | React Router v7                                           |
| State          | Redux Toolkit + redux-persist (localStorage), Zustand     |
| Icons          | Lucide React, MUI Icons                                   |
| Fonts          | Inter, Literata, JetBrains Mono, Space Grotesk - bundled with Fontsource (SIL Open Font License), no font CDN |
| AI             | Google Gemini API (free tier) through a Vercel serverless function, with Chrome's built-in AI ([Prompt API][prompt-api]) on the device as fallback |
| Dates          | MUI X Date Pickers + Day.js (loaded after the page)       |
| PDF export     | html2canvas + jsPDF (loaded only when exporting)          |
| Component docs | Storybook 10                                              |
| Testing        | Vitest + Playwright (Storybook stories)                   |

## AI Assistant

The AI features are free for every user, with no account. Users choose where the AI runs the first time they click an AI button, and can change it in **Settings** (gear icon):

- **Use online AI:** Google's Gemini, through the app's serverless function. Better text, on any device. When its free quota is used up, Chrome's built-in AI takes over, if the computer has it.
- **Keep it on my computer:** Chrome's built-in AI ([Prompt API][prompt-api]), which runs the model on the user's own computer, so nothing is sent.

More about the AI:

- **Requirements for the built-in AI:** a recent desktop version of Google Chrome on hardware that supports the model (see [Requirements](#requirements)).
- **First use:** the model downloads once (a few minutes). Users can start the download from **Settings** (gear icon), or it starts on the first AI action. A progress bar shows the download.
- **English only:** the AI features work in English.
- **Job title or keyword:** users can type a full job title ("Senior Accountant") or a keyword about their work - a skill, tool, technology or field ("React", "bookkeeping"). The AI first finds the profession it points to, then writes about that profession. Input that can't be linked to any kind of work (random letters, names, greetings) shows a message asking for a real job title.

### Where the AI is used

| Section         | Button                   | What it does                                                   |
| --------------- | ------------------------ | -------------------------------------------------------------- |
| Personal Info   | Smart Rewrite            | Writes the professional summary from the professional title    |
| Work Experience, Volunteering | Generate Achievements | Writes 3-5 achievement bullets from the role title and the user's own notes in the field |
| Skills          | Suggest skills with AI   | Suggests up to 10 new skills for the professional title        |

Behavior shared by all AI actions:

- The field is cleared and the AI writes from scratch, showing the text as it is written.
- If the AI fails or rejects the title, the text from before the click comes back.
- Editing or deleting a title keeps its text (the user may be retyping it); only the AI button replaces it.
- A spinner shows on the button while the AI works.

## Behind the scenes: how the AI works

### Online AI first, built-in AI as fallback

`askAI` (`src/services/aiService.ts`) picks the AI for every request:

1. **The user allowed the online AI:** `cloudProvider` sends the request to `/api/generate`, the app's serverless function (`api/generate.ts`). The function adds the API key, calls the Gemini API and returns the reply, streamed for Smart Rewrite and Generate Achievements.
2. **The online AI fails or its quota is used up (HTTP 429):** the same request goes to Chrome's built-in AI, if this computer has it. After any failure the online AI is skipped for a minute, so the other requests of the same click (and the next clicks) don't wait for it again.
3. **The user chose Keep it on my computer:** every request goes to Chrome's built-in AI and nothing is sent.

The serverless function protects the key and its free quota:

- **The key stays on the server.** It is set in Vercel, never in the browser's code.
- **Only the app's prompts run.** The function accepts only the system prompts in `src/services/aiPrompts.ts` and texts up to 4,000 characters, so nobody can use it as a free general-purpose AI.
- **A limit per visitor.** Each IP address gets 20 requests a minute (about seven AI clicks), so one person can't use up the daily quota for everyone. The limit is kept in memory, per server instance.
- **Nothing is stored, and the user's text is never logged.** When Google fails, the function logs and returns only Google's status and reason (e.g. `403 PERMISSION_DENIED`), so a broken deploy shows in the Vercel logs and in the browser's Network tab.

`cloudProvider` also leaves out the organization (`Organization: ...`) from volunteering requests. Chrome's built-in AI still gets it, because it stays on the computer.

### Setting up the online AI

1. Create a free API key in [Google AI Studio][ai-studio] (no card needed).
2. In the Vercel project, open **Settings → Environment Variables** and add `GEMINI_API_KEY`. Optionally add `GEMINI_MODEL` to pin a model (e.g. `gemini-3.8-flash`). By default the function uses `gemini-flash-latest`, which Google moves to its newest Flash model, so a retired model never breaks the app.
3. Redeploy. The free tier's current limits are shown per project in AI Studio.

Without the key, `/api/generate` answers `503` and the app uses Chrome's built-in AI. `npm run dev` has no serverless functions, so locally the app also uses the built-in AI; `vercel dev` runs the function too.

### What Chrome provides

Chrome has an AI model built in, **Gemini Nano**, and gives web pages access to it through the **[Prompt API][prompt-api]**: a global JavaScript object called `LanguageModel`. That object is the whole "setup":

- **Nothing to configure.** There is no Google account, API key, cloud project or billing, and no code or settings on Google's side. The app only calls `LanguageModel` in the browser.
- **No server.** The model runs on the user's computer. According to Chrome's documentation, no data is sent to Google or any third party when the model is used.
- **One-time download.** Chrome downloads the model the first time it is needed. After that it works offline.
- **Requirements** (from Chrome's documentation):
  - Windows 10/11, macOS 13+, Linux, or ChromeOS on a Chromebook Plus. Phones are not supported.
  - At least 22 GB of free disk space.
  - A graphics card with more than 4 GB of memory, or 16 GB of RAM and 4 CPU cores.

The app uses these parts of the API, all in `src/services/providers/browserProvider.ts`:

| API                                      | What it does                                                                                  | When the app uses it                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `LanguageModel.availability()`           | Says whether the model can run: `available`, `downloadable`, `downloading` or `unavailable`   | On app start, and before the first request of each prompt    |
| `LanguageModel.create()`                 | Loads the model with its instructions (the system prompt). `monitor` reports download progress | Once per prompt, and from the Settings download button       |
| `session.clone()`                        | Copies a ready session cheaply                                                                | Every request                                                |
| `session.prompt(text, { responseConstraint })` | Returns the whole reply. The constraint (a JSON Schema) forces the reply's shape        | Finding the profession, checking results                     |
| `session.promptStreaming(text)`          | Returns the reply piece by piece while it is written                                          | Smart Rewrite, Generate Achievements                         |
| `session.prompt(text)`                   | Returns the whole reply, with no constraint                                                   | Suggest skills                                               |
| `session.destroy()`                      | Frees the copy                                                                                | After every request                                          |

Every call declares English text in and out (`expectedInputs` / `expectedOutputs`), because the AI features are English only.

### When the app talks to the AI

1. **App start.** `AISettingsProvider` (`src/routes/AISettings`) calls `getBrowserAIAvailability()` once. This only asks Chrome whether the AI can run; it does not load the model. The answer controls the Settings panel and the AI buttons:
   - no `LanguageModel` (another browser, or an old Chrome): the buttons show "AI not available in this browser";
   - `unavailable`: the buttons show "AI not available on this computer";
   - anything else: the buttons work.
2. **Settings → Download AI model.** `prepareBrowserAI()` creates an empty session and destroys it, which starts the one-time download. Chrome allows the download only after a click. A progress bar in Settings and a toast show the progress.
3. **The AI buttons.** These are the only places that write text:

| Button                  | Handler (view)                                      | AI calls per click                                                        |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| Smart Rewrite           | `onSmartRewrite` in `PersonalInfoFormView`          | find profession → write summary (streamed) → check summary                |
| Generate Achievements   | `onGenerateAchievements` in `WorkExperienceFormView` | find profession → write bullets (streamed) → check bullets                |
| Suggest skills with AI  | `handleSuggest` in `SkillsFormView`                 | find profession → write list. The list is checked in code (`parseSkillList`), not by the AI |

The profession is cached per title until the page reloads, so clicking again with the same title skips that call.

### One click, step by step

Taking **Smart Rewrite** with the title "React" as an example:

1. `ensureAIAvailable()` asks where the AI may run, the first time only (`CloudConsentDialog`). With Keep it on my computer, it stops here and shows a dialog if the built-in AI can't run on this browser or computer.
2. The view calls `useAI().improve("smartRewrite", …)` (`src/hooks/useAI`).
3. **Find the profession.** `resolveJobTitle` sends "React" with `JOB_TITLE_PROMPT` and a JSON Schema, so the reply is always shaped like `{"isProfession": true, "jobTitle": "React Developer"}`. If `isProfession` is `false`, a dialog asks for a real job title and nothing else runs.
4. **Write.** It sends `Job title: React Developer` with the `smartRewrite` prompt. The reply is streamed, and each piece is shown in the summary field as it arrives.
5. **Check.** The finished text is sent with a validation prompt, and the reply is forced to be `VALID` or `INVALID`. On `INVALID`, a dialog asks for more context.
6. **Result.** On success, the new text stays. On any failure, the text from before the click comes back.

Every call goes through the same path:

```
View (src/routes/ResumeBuilder/ResumeForms/*View)
  → useAI().improve (src/hooks/useAI)            find profession → write text → check result
  → askAI (src/services/aiService.ts)               online AI first, if the user allowed it
  → cloudProvider.generate → postGenerate (src/services/api) → /api/generate (api/generate.ts) → Gemini API
     or, as fallback or with Keep it on my computer:
  → browserProvider.generate (src/services/providers/browserProvider.ts)
  → Chrome's LanguageModel (Gemini Nano, on this computer)
```

### Sessions: why later clicks are faster

Creating a session loads the model and reads the instructions, which takes a few seconds. So `browserProvider` creates **one base session per prompt** the first time that prompt is used, keeps it in memory, and runs every request on a `clone()` of it, which it destroys afterwards. The base session never sees the requests, so each one starts clean.

There are six prompts, so at most six base sessions: find profession, summary, achievements, skills and the two validators. The first click after loading the page is the slowest. Reloading the page starts over.

### The prompts

All instructions sent to the AI are in `src/services/aiPrompts.ts`. They contain no user text, so the base sessions can be reused, and the serverless function accepts only these. The user's text is only in the request (`Job title: …`, the user's notes, the current skills).

### Errors

| What happened                                          | Code                 | Dialog                                |
| ------------------------------------------------------ | -------------------- | ------------------------------------- |
| The browser has no `LanguageModel`                     | `unsupported`        | AI not available in this browser      |
| Chrome says `unavailable` (the computer can't run it)  | `unsupported_device` | AI not available on this computer     |
| Creating the first session fails before the model is on the computer (disk space, connection) | `download_failed` | The AI model couldn't download |
| The online AI is busy (quota used up) and there is no built-in AI to fall back to | `cloud_limit` | The AI is busy |
| Any other failure                                      | `request_failed`     | AI request failed                     |
| The title is not a profession, the volunteer role doesn't say what the work was, or the check says `INVALID` | - | More context needed |

The header also shows the AI's status at all times (**Online AI**, **AI ready**, **AI needs download**, **AI downloading**, **AI not supported**, **AI download failed**), with the reason on hover, so users know before they click an AI button.

### Debugging

In development, the browser console (F12) shows:

- what the AI found for each title: `[AI] Job title: "React" → {"isProfession":true,"jobTitle":"React Developer"} → React Developer`;
- how long each step took: `[AI] smartRewrite: 4210ms { find profession: 820, write text: 2650, check result: 740 }`.

To see the model's status in Chrome, open `chrome://on-device-internals`.

## Project Structure

```
api/
└── generate.ts      # Serverless function that calls the Gemini API
src/
├── assets/          # Icons
├── components/      # Presentational UI components, each with Storybook stories
│   ├── AppBars/     # Header bar and sections bar
│   ├── Buttons/
│   ├── Dialogs/     # Error and "more context" dialogs
│   ├── Drawers/
│   ├── Feedback/    # Toasts (e.g. AI model download progress)
│   ├── Forms/       # Personal Info, Work Experience, Education, Skills
│   ├── ResumePreview/
│   └── Settings/    # Settings panel, AI status
├── hooks/           # useAI, useEnsureAIAvailable, ...
├── locale/en/       # All UI text (en-tokens.ts)
├── redux/           # Store, resume slice, selectors (persisted to localStorage)
├── routes/          # Views that connect components to state and the AI
│   ├── AISettings/  # Online AI consent, built-in AI availability and model download
│   ├── Dialogs/
│   ├── HeaderBar/
│   ├── HomePage/
│   ├── ResumeBuilder/ResumeForms/   # One view per form section
│   └── SectionsBar/
├── services/        # AI service, prompts, the AI providers and the backend calls (api/)
├── stores/          # Zustand stores (section scrolling)
├── theme/           # MUI theme and design tokens
└── utils/           # resolveJobTitle, parseSkillList, AI result validators
```

## Getting Started

### Prerequisites

- Node.js 18+
- For the online AI: a free Gemini API key (see [Setting up the online AI](#setting-up-the-online-ai))
- For the built-in AI: a recent desktop version of Google Chrome (see [Requirements](#requirements))

### Installation

```bash
git clone https://github.com/mariatourli-p/ai-resume-builder.git
cd ai-resume-builder
npm install
npm run dev
```

### Scripts

| Command                   | What it does                         |
| ------------------------- | ------------------------------------ |
| `npm run dev`             | Start the dev server                 |
| `npm run build`           | Type-check and build for production  |
| `npm run lint`            | Run ESLint                           |
| `npm run preview`         | Serve the production build           |
| `npm run storybook`       | Start Storybook on port 6006         |
| `npm run build-storybook` | Build the static Storybook           |

### VS Code tasks

`.vscode/tasks.json` has tasks for install, dev server, Storybook, build, lint, a combined **Check (build + lint)**, and preview. With the recommended [Tasks](https://marketplace.visualstudio.com/items?itemName=actboy168.tasks) extension they show as colored buttons in the status bar. They can also be run with **Ctrl+Shift+P → Tasks: Run Task** (**Ctrl+Shift+B** runs the build).

## Performance

Measured with Playwright on the production build, with a resume of 3 work entries:

| Measurement                         | Result                                          |
| ----------------------------------- | ----------------------------------------------- |
| Main JavaScript bundle              | 639 KB (201 KB gzip)                            |
| Typing, per key press               | ~5-7 ms of JavaScript (~40-45 ms on a 4x slower CPU) |
| Saving to localStorage, per key     | under 0.1 ms                                    |

What keeps it fast:

- The resume preview updates at low priority (`useDeferredValue`) and is memoized, so typing never waits for it.
- Each work experience entry is memoized, so typing in one entry doesn't re-render the others.
- The PDF libraries load only when the user exports.
- The AI keeps one ready session per instruction and clones it for each request, and streams the text as it is written.

## Branch Strategy

| Branch   | Purpose                        |
| -------- | ------------------------------ |
| `main`   | Stable code                    |
| `dev`    | Active development             |
| `feat/*` | Feature branches → PR into dev |

## License

GPL v3 - see [LICENCE](./LICENCE) for details.

Third-party software, fonts and icons, and their licenses, are listed in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

[prompt-api]: https://developer.chrome.com/docs/ai/prompt-api
[chrome-ai-requirements]: https://developer.chrome.com/docs/ai/get-started
[google-ai-policy]: https://policies.google.com/terms/generative-ai/use-policy
[gemini-api]: https://ai.google.dev/gemini-api/docs
[ai-studio]: https://aistudio.google.com/apikey
