# AI Resume Builder

An AI-powered resume builder that helps anyone create a polished, professional resume in minutes — no design or writing skills required.

> 🚧 This project is currently under active development. Follow along as it gets built in public.

---

## Overview

Users fill in their details, and the app uses Claude AI (Anthropic) to improve their text, suggest skills, and generate professional content in real time. The result is a beautiful, downloadable resume ready to send.

## Features

- **AI-powered writing** — improve bio, work experience, and project descriptions with one click using Claude
- **Live preview** — resume updates in real time as you type
- **Multiple templates** — switch between resume layouts instantly
- **Skills suggestions** — AI suggests relevant skills based on your job title
- **Autosave** — all data is saved automatically to localStorage
- **PDF export** — download your resume as a named PDF
- **Settings** — securely store your own Anthropic API key

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| UI library | MUI (Material UI) v9 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| State | Preact Signals |
| Icons | Lucide React |
| AI | Anthropic Claude API |
| Component docs | Storybook 10 |
| Testing | Vitest + Playwright |

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
# Clone the repository
git clone https://github.com/mariatourli-p/ai-resume-builder.git
cd ai-resume-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

### API Key Setup

The app uses a bring-your-own-key model. You can add your Anthropic API key directly in the app's Settings panel when it runs, or create a `.env` file at the root:

```bash
cp .env.example .env
```

Then add your key to `.env`:

```
VITE_ANTHROPIC_API_KEY=your_key_here
```

### Storybook

To browse the component library:

```bash
npm run storybook
```

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `dev` | Active development |
| `feat/*` | Feature branches → PR into dev |

## Roadmap

- [ ] Resume preview with multiple templates
- [ ] AI text improvement per section
- [ ] Skills suggestion by job title
- [ ] PDF export
- [ ] Dark/light mode
- [ ] Accent color and font customization

## License

MIT — see [LICENSE](./LICENSE) for details.
