# AI Resume Builder

An AI-powered resume builder that helps anyone create a polished, professional resume in minutes - no design or writing skills required. The AI features are free and run on the user's own computer.

> 🚧 This project is in active development. Features marked ✅ are implemented; the rest are planned.

## Requirements

The resume editor, preview and PDF export work in any modern browser. **The AI features need Chrome's built-in AI**, which runs only on some computers:

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

- **The AI is provided by Google, not by this app.** It is Gemini Nano, built into Chrome. Google decides which browsers, versions and devices support it, and may change or remove it.
- **Check what the AI writes.** Its text can be wrong or invented. Users should review every suggestion before using it in a resume.
- **Google's rules apply.** Using the built-in AI is subject to Google's [Generative AI Prohibited Use Policy][google-ai-policy].
- **Privacy.** The resume stays in the browser, and the AI runs on the user's computer. See [Privacy: what leaves the browser](#privacy-what-leaves-the-browser).

## Privacy: what leaves the browser

Nothing the user writes. The app has no accounts, no cookies, no analytics and no backend: it is a static site. Fonts and icons are bundled with the app, not loaded from other sites.

| Data | Where it goes |
| ---- | ------------- |
| The whole resume (every field and the photo) | Saved only in this browser (localStorage, key `resume_builder`). Clearing the browser's site data deletes it. |
| The PDF | Made in the browser. It is never uploaded. |
| What the AI buttons work on (titles, notes, skills) | Chrome's built-in AI (Gemini Nano), which runs on the user's computer. It is not sent to any AI service, Google's included. |

Good to know:

- **The model download.** The first time, Chrome downloads the AI model from Google, like any Chrome update. The resume is not part of that download.
- **The web host.** The host that serves the app (Vercel) sees each visitor's IP address, like any website. It never receives the resume.

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

Users fill in their details section by section (Personal Info, Skills, Work Experience, Education, Courses & Seminars, Volunteering) and see the resume update live next to the form. The AI writes the professional summary, key achievements and skill suggestions from the user's job title, and the finished resume downloads as a PDF.

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
| AI             | Chrome built-in AI ([Prompt API][prompt-api]), on-device  |
| Dates          | MUI X Date Pickers + Day.js (loaded after the page)       |
| PDF export     | html2canvas + jsPDF (loaded only when exporting)          |
| Component docs | Storybook 10                                              |
| Testing        | Vitest + Playwright (Storybook stories)                   |

## AI Assistant

The AI features are free for every user: no account and no API key. They use Chrome's built-in AI ([Prompt API][prompt-api]), which runs the model on the user's own computer, so resume data is never sent to an AI service.

- **Requirements:** a recent desktop version of Google Chrome on hardware that supports the built-in model (see [Requirements](#requirements)).
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

- The AI writes from scratch. The field keeps your text until the new text has been checked, and only then is it replaced.
- If the AI fails or rejects the title, your text stays as it was.
- Editing or deleting a title keeps its text (the user may be retyping it); only the AI button replaces it.
- A spinner shows on the button while the AI works.

## Behind the scenes: how the AI works

### What Google provides

Chrome has an AI model built in, **Gemini Nano**, and gives web pages access to it through the **[Prompt API][prompt-api]**: a global JavaScript object called `LanguageModel`. That object is the whole "setup":

- **Nothing to configure.** There is no Google account, API key, cloud project or billing, and no code or settings on Google's side. The app only calls `LanguageModel` in the browser.
- **No server.** The model runs on the user's computer. According to Chrome's documentation, no data is sent to Google or any third party when the model is used.
- **One-time download.** Chrome downloads the model the first time it is needed. After that it works offline.
- **Requirements** (from Chrome's documentation):
  - Windows 10/11, macOS 13+, Linux, or ChromeOS on a Chromebook Plus. Phones are not supported.
  - At least 22 GB of free disk space.
  - A graphics card with more than 4 GB of memory, or 16 GB of RAM and 4 CPU cores.

The app uses these parts of the API, all in `src/services/browserAI/`:

| API                                      | What it does                                                                                  | When the app uses it                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `LanguageModel.availability()`           | Says whether the model can run: `available`, `downloadable`, `downloading` or `unavailable`   | On app start, and before the first request of each prompt    |
| `LanguageModel.create()`                 | Loads the model with its instructions (the system prompt). `monitor` reports download progress | Once per prompt, and from the Settings download button       |
| `session.clone()`                        | Copies a ready session cheaply                                                                | Every request                                                |
| `session.prompt(text, { responseConstraint })` | Returns the whole reply. The constraint (a JSON Schema) forces the reply's shape        | Finding the profession, checking results                     |
| `session.prompt(text)`                   | Returns the whole reply, with no constraint                                                   | Smart Rewrite, Generate Achievements, Suggest skills         |
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
| Smart Rewrite           | `onSmartRewrite` in `PersonalInfoFormView`          | find profession → write summary → check summary                           |
| Generate Achievements   | `onGenerateAchievements` in `WorkExperienceFormView` | find profession → write bullets → check bullets                           |
| Suggest skills with AI  | `handleSuggest` in `SkillsFormView`                 | find profession → write list. The list is checked in code (`parseSkillList`), not by the AI |

The profession is cached per title until the page reloads, so clicking again with the same title skips that call.

### One click, step by step

Taking **Smart Rewrite** with the title "React" as an example:

1. `ensureAIAvailable()` stops here and shows a dialog if the AI can't run on this browser or computer.
2. The view calls `useAI().improve("smartRewrite", …)` (`src/hooks/useAI`).
3. **Find the profession.** `resolveJobTitle` sends "React" with `JOB_TITLE_PROMPT` and a JSON Schema, so the reply is always shaped like `{"isProfession": true, "jobTitle": "React Developer"}`. If `isProfession` is `false`, a dialog asks for a real job title and nothing else runs.
4. **Write.** It sends `Job title: React Developer` with the `smartRewrite` prompt. The field still shows the user's text meanwhile.
5. **Check.** The finished text is sent with a validation prompt, and the reply is forced to be `VALID` or `INVALID`. On `INVALID`, a dialog asks for more context.
6. **Result.** Only a text that passed the check goes into the field. On any failure, the user's text stays as it was.

Every call goes through the same path:

```
View (src/routes/ResumeBuilder/ResumeForms/*View)
  → useAI().improve (src/hooks/useAI)            find profession → write text → check result
  → askAI (src/services/aiService.ts)
  → generateWithBrowserAI (src/services/browserAI/)
  → Chrome's LanguageModel (Gemini Nano, on this computer)
```

### Sessions: why later clicks are faster

Creating a session loads the model and reads the instructions, which takes a few seconds. So `generateWithBrowserAI` creates **one base session per prompt** the first time that prompt is used, keeps it in memory, and runs every request on a `clone()` of it, which it destroys afterwards. The base session never sees the requests, so each one starts clean.

There are eight prompts, so at most eight base sessions: find profession, find volunteer area, summary, achievements, volunteering achievements, skills and the two validators. The first click after loading the page is the slowest. Reloading the page starts over.

### The prompts

All instructions sent to the AI are in `src/services/aiPrompts.ts`. They contain no user text, so the base sessions can be reused. The user's text is only in the request (`Job title: …`, the user's notes, the current skills).

### Errors

| What happened                                          | Code                 | Dialog                                |
| ------------------------------------------------------ | -------------------- | ------------------------------------- |
| The browser has no `LanguageModel`                     | `unsupported`        | AI not available in this browser      |
| Chrome says `unavailable` (the computer can't run it)  | `unsupported_device` | AI not available on this computer     |
| Creating the first session fails before the model is on the computer (disk space, connection) | `download_failed` | The AI model couldn't download |
| Any other failure                                      | `request_failed`     | AI request failed                     |
| The title is not a profession, the volunteer role doesn't say what the work was, or the check says `INVALID` | - | More context needed |

The header also shows the AI's status at all times (**AI ready**, **AI needs download**, **AI downloading**, **AI not supported**, **AI download failed**), with the reason on hover, so users know before they click an AI button.

### Debugging

In development, the browser console (F12) shows:

- what the AI found for each title: `[AI] Job title: "React" → {"isProfession":true,"jobTitle":"React Developer"} → React Developer`;
- how long each step took: `[AI] smartRewrite: 4210ms { find profession: 820, write text: 2650, check result: 740 }`;
- why a request failed: `[AI] Request failed`, with the full error.

To see the model's status in Chrome, open `chrome://on-device-internals`.

## Project Structure

```
src/
├── assets/          # Icons
├── components/      # Presentational UI components, each with Storybook stories
│   ├── AppBars/     # Header bar and sections bar
│   ├── Buttons/
│   ├── Dialogs/     # Errors, "more context", licenses
│   ├── Drawers/
│   ├── Feedback/    # Toasts (e.g. AI model download progress)
│   ├── Forms/       # Personal Info, Work Experience, Education, Skills
│   ├── ResumePreview/
│   └── Settings/    # Settings panel, AI status
├── hooks/           # useAI, useEnsureAIAvailable, ...
├── locale/en/       # All UI text (en-tokens.ts)
├── redux/           # Store, resume slice, selectors (persisted to localStorage)
├── routes/          # Views that connect components to state and the AI
│   ├── AISettings/  # Built-in AI availability and model download
│   ├── Dialogs/
│   ├── HeaderBar/
│   ├── HomePage/
│   ├── ResumeBuilder/ResumeForms/   # One view per form section
│   └── SectionsBar/
├── services/        # AI service, prompts and the browser AI provider
├── stores/          # Zustand stores (section scrolling)
├── theme/           # MUI theme and design tokens
└── utils/           # resolveJobTitle, parseSkillList, AI result validators
```

## Getting Started

### Prerequisites

- Node.js 18+
- A recent desktop version of Google Chrome to use the AI features (see [Requirements](#requirements))

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
| Main JavaScript bundle              | 656 KB (205 KB gzip)                            |
| Typing, per key press               | ~5-7 ms of JavaScript (~40-45 ms on a 4x slower CPU) |
| Saving to localStorage              | at most twice a second (5 saves for 40 keys)    |

What keeps it fast:

- The resume preview updates at low priority (`useDeferredValue`) and is memoized, so typing never waits for it.
- Each work experience entry is memoized, so typing in one entry doesn't re-render the others.
- The PDF libraries load only when the user exports.
- The AI keeps one ready session per instruction and clones it for each request.

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
