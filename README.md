# AI Resume Builder

An AI-powered resume builder that helps anyone create a polished, professional resume in minutes — no design or writing skills required.

> 🚧 This project is in early scaffolding stage. The features below marked as ✅ are implemented. Everything else is planned and actively being built.

---

## Current Status

| Feature                        | Status         |
| ------------------------------ | -------------- |
| Project architecture & routing | ✅ Done        |
| Component library (Storybook)  | ✅ Done        |
| Side panel UI                  | ✅ Done        |
| Icons system                   | ✅ Done        |
| Resume form inputs             | 🔄 In progress |
| Live preview                   | 🔄 In progress |
| Claude AI text improvement     | 📋 Planned     |
| Multiple templates             | 📋 Planned     |
| Skills suggestion by AI        | 📋 Planned     |
| Autosave to localStorage       | 📋 Planned     |
| PDF export                     | 📋 Planned     |
| Settings / API key storage     | 📋 Planned     |

---

## Overview

Users will fill in their details, and the app will use Claude AI (Anthropic) to improve their text, suggest skills, and generate a beautiful resume in real time.

## Tech Stack

| Category       | Technology            |
| -------------- | --------------------- |
| Framework      | React 19 + TypeScript |
| Build tool     | Vite                  |
| UI library     | MUI (Material UI) v9  |
| Styling        | Tailwind CSS v4       |
| Routing        | React Router v7       |
| State          | Preact Signals        |
| Icons          | Lucide React          |
| AI             | Anthropic Claude API  |
| Component docs | Storybook 10          |
| Testing        | Vitest + Playwright   |

## Project Structure

```
src/
├── assets/         # Icons and static assets
├── components/     # Reusable UI components
│   ├── Buttons/
│   └── SidePanel/
├── hooks/          # Custom React hooks
├── locale/         # i18n tokens
├── routes/         # Page-level components
│   ├── HomePage/
│   └── ProfileBuilder/
├── styles/         # Theme and palette
├── types.ts        # Shared TypeScript types
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/mariatourli-p/ai-resume-builder.git
cd ai-resume-builder
npm install
npm run dev
```

### Storybook

```bash
npm run storybook
```

## Branch Strategy

| Branch   | Purpose                        |
| -------- | ------------------------------ |
| `main`   | Stable code                    |
| `dev`    | Active development             |
| `feat/*` | Feature branches → PR into dev |

## License

GPL v3 — see [LICENSE](./LICENSE) for details.
