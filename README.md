# AI Resume Builder

An AI-powered resume builder that helps anyone create a polished, professional resume in minutes - no design or writing skills required. The AI features are free and run on the user's own computer.

> 🚧 This project is in active development. Features marked ✅ are implemented; the rest are planned.

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
| Settings (accent color, AI status)    | ✅ Done        |
| AI for the Education section          | 📋 Planned     |
| "Optimize Resume" (all sections)      | 📋 Planned     |
| Multiple templates                    | 📋 Planned     |

---

## Overview

Users fill in their details section by section (Personal Info, Work Experience, Education, Skills) and see the resume update live next to the form. The AI writes the professional summary, key achievements and skill suggestions from the user's job title, and the finished resume downloads as a PDF.

## Tech Stack

| Category       | Technology                                                |
| -------------- | --------------------------------------------------------- |
| Framework      | React 19 + TypeScript                                     |
| Build tool     | Vite                                                      |
| UI library     | MUI (Material UI) v9                                      |
| Styling        | MUI `sx` + Tailwind CSS v4                                |
| Routing        | React Router v7                                           |
| State          | Redux Toolkit + redux-persist (localStorage), Zustand     |
| Icons          | Lucide React, MUI Icons                                   |
| AI             | Chrome built-in AI ([Prompt API][prompt-api]), on-device  |
| PDF export     | html2canvas + jsPDF (loaded only when exporting)          |
| Component docs | Storybook 10                                              |
| Testing        | Vitest + Playwright (Storybook stories)                   |

## AI Assistant

The AI features are free for every user: no account and no API key. They use Chrome's built-in AI ([Prompt API][prompt-api]), which runs the model on the user's own computer, so resume data is never sent to an AI service.

- **Requirements:** a recent desktop version of Google Chrome on hardware that supports the built-in model.
- **First use:** the model downloads once (a few minutes). Users can start the download from **Settings** (gear icon), or it starts on the first AI action. A progress bar shows the download.
- **English only:** the AI features work in English.
- **Job title or keyword:** users can type a full job title ("Senior Accountant") or a keyword about their work - a skill, tool, technology or field ("React", "bookkeeping"). The AI first finds the profession it points to, then writes about that profession. Input that can't be linked to any kind of work (random letters, names, greetings) shows a message asking for a real job title.

### Where the AI is used

| Section         | Button                   | What it does                                                   |
| --------------- | ------------------------ | -------------------------------------------------------------- |
| Personal Info   | Smart Rewrite            | Writes the professional summary from the professional title    |
| Work Experience | Generate Achievements    | Writes 3 achievement bullets from the role title               |
| Skills          | Suggest skills with AI   | Suggests up to 10 new skills for the professional title        |

Behavior shared by all AI actions:

- The field is cleared and the AI writes from scratch, showing the text as it is written.
- If the AI fails or rejects the title, the previous text comes back only if it was written for the same title.
- Deleting a title also clears the text that was written for it.
- A spinner shows on the button while the AI works.

### How a request flows

```
Button → View (src/routes/ResumeBuilder/ResumeForms/*View)
       → useAI (src/hooks/useAI)                 find profession → write text → check result
       → improveText (src/services/aiService.ts)
       → browserProvider (src/services/providers/browserProvider.ts) → Chrome's on-device model
```

There is no AI backend: nothing goes over the network. The AI instructions live in `src/services/aiPrompts.ts`.

In development, the browser console (F12) logs what the AI found for each title and how long each step of a request took, e.g. `[AI] smartRewrite: 4210ms { find profession: 820, write text: 2650, check result: 740 }`.

## Project Structure

```
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
├── hooks/           # useAI, useRequireAIProvider, useTextTitles, ...
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
- A recent desktop version of Google Chrome to use the AI features (see [AI Assistant](#ai-assistant))

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

`.vscode/tasks.json` has tasks for install, dev server, build, lint, a combined **Check (build + lint)**, preview, and Storybook. Run them with **Ctrl+Shift+P → Tasks: Run Task** (**Ctrl+Shift+B** runs the build).

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

[prompt-api]: https://developer.chrome.com/docs/ai/prompt-api
