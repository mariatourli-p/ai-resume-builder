const SECTIONS = {
  sections: {
    personalInfo: {
      title: "Personal Info",
      fields: {
        photo: {
          label: "Photo",
          upload: "Upload photo",
          change: "Change photo",
          remove: "Remove",
          hint: "Optional - a clear, square headshot works best",
          alt: "Profile photo",
        },
        fullName: { label: "FULL NAME" },
        professionalTitle: { label: "PROFESSIONAL TITLE" },
        emailAddress: { label: "EMAIL ADDRESS" },
        phone: { label: "PHONE / PROFILE" },
        location: { label: "LOCATION" },
        portfolio: { label: "PORTFOLIO / WEBSITE" },
        professionalSummary: {
          label: "PROFESSIONAL SUMMARY",
          hint: "Use 2-3 impact sentences.",
        },
      },
    },

    workExperience: {
      title: "Work Experience",
      addButton: "Add Experience",
      fields: {
        roleTitle: { label: "ROLE TITLE" },
        company: { label: "COMPANY / ORG" },
        location: { label: "LOCATION" },
        dates: {
          start: "START DATE",
          end: "END DATE",
          current: "I currently work here",
          present: "Present",
        },
        achievements: {
          label: "Key Achievements & Milestones",
          separateLines: "Separate points with a new line",
          placeholder:
            "e.g.\nBuilt the payments API used by 50K customers\nCut cloud costs by 30%\nMentored 2 junior developers",
          hint: "Rough notes are enough - the AI polishes them",
          tips: {
            title: "How to write your achievements",
            items: [
              "One achievement per line - press Enter to start the next one.",
              "Say what you did and the result, with numbers if you have them.",
              "Name the tools, projects or teams involved.",
              "Rough notes are fine - the AI fixes the wording.",
              "Leave it empty to get ideas from your role title.",
            ],
            exampleTitle: "Example",
            example: [
              "built payments api used by 50k customers",
              "cut cloud costs 30% by moving to AWS Lambda",
              "mentored 2 junior developers",
            ],
          },
        },
      },
    },

    volunteering: {
      title: "Volunteering",
      addButton: "Add Volunteering",
      fields: {
        organization: { label: "ORGANIZATION" },
        current: "I currently volunteer here",
      },
    },

    education: {
      title: "Education",
      addButton: "Add Degree",
      fields: {
        institution: { label: "INSTITUTION / SCHOOL NAME" },
        degree: { label: "DEGREE / FIELD & HONORS" },
        graduationDate: {
          label: "GRADUATION DATE",
          placeholder: "2011 - 2015",
        },
        location: { label: "LOCATION" },
        description: {
          label: "DETAILS (OPTIONAL)",
          placeholder:
            "Thesis, key modules or grade, e.g. Thesis on pain management in the ICU, GPA 8.5/10",
        },
      },
    },
    courses: {
      title: "Courses & Seminars",
      addButton: "Add Course",
      fields: {
        title: { label: "COURSE / SEMINAR TITLE" },
        organizer: { label: "ORGANIZER / PROVIDER" },
        date: { label: "DATE" },
        description: {
          label: "DESCRIPTION (OPTIONAL)",
          placeholder:
            "What you learned or did there, e.g. Built a REST API in Node.js as the final project",
        },
      },
    },
    skills: {
      title: "Skills & Core Competencies",
      addButton: "Add",
      inputPlaceholder: "Type tech stack keyword or skill, and hit Enter",
      currentSkillsLabel: "Current Skills Applied",
      suggestedLabel: "Suggested for",
      clickToAdd: "Click tag to add instantly",
      skills: "Skills",
    },
  },
} as const;

export const enTokens = {
  app: {
    title: "AI Resume Builder",
    builder: "Builder",
    analysis: "Analysis",
    resume_sections: "RESUME SECTIONS",
    open_menu: "Sections menu",
    branding_colors: "BRANDING COLORS",
  },
  /** Section headings of the resume itself; the other sections use their form's title */
  preview: {
    // Shown until the user types their name
    namePlaceholder: "Your Name",
    summary: "Professional Summary",
    experience: "Experience",
  },
  sections: SECTIONS.sections,
  ai: {
    suggest: "Suggest skills",
    suggestFor: 'Suggest skills for "{title}"',
    suggestNeedsTitle: "Add your professional title in Personal Info first",
    suggestingFor: 'Suggesting skills for "{title}"...',
    generateAchievements: "Generate Achievements",
    generating: "Generating...",
    rewriting: "Rewriting...",
    smartRewrite: "Smart Rewrite",
  },
  settings: {
    title: "Visual Style Customizer",
    aiTitle: "AI Assistant",
    aiFooter:
      "Free for everyone. The AI runs inside Chrome on your computer, so your resume is never sent to an AI service.",
    templates: "Templates",
  },
  aiAssistant: {
    label: "Built-in browser AI",
    description: "Free · no account or key · runs on your device",
    checking: "Checking whether your browser supports it…",
    unsupported_browser:
      "Not supported in this browser. The AI features need a recent desktop version of Google Chrome.",
    unavailable:
      "Your Chrome supports the AI, but this computer doesn't meet its requirements (graphics card, memory or free disk space).",
    downloadable:
      "The AI model needs a one-time download (a few minutes). You can start it now or it starts on first use.",
    downloadButton: "Download AI model",
    downloading: "Downloading the AI model (one time)… {percent}%",
    downloadingBackground:
      "The AI model is downloading in the background. This can take a few minutes.",
    available: "Ready - nothing leaves your device.",
    downloadFailed:
      "The AI model download didn't finish. Check that you have at least 22 GB of free disk space and a stable internet connection, then try again.",
    retryDownload: "Try the download again",
    badge: {
      checking: "Checking AI…",
      available: "AI ready",
      downloadable: "AI needs download",
      downloading: "AI downloading",
      downloadingPercent: "AI downloading {percent}%",
      downloadFailed: "AI download failed",
      unsupported: "AI not supported",
    },
  },
  export: {
    export_pdf: "Export PDF",
  },
  footer: {
    copyright: "© {year} AI Resume Builder. All rights reserved.",
    privacy:
      "No cookies or tracking. Your resume is saved only in this browser and is never uploaded.",
    licenses: "Open-source licenses",
  },
  licensesDialog: {
    title: "Open-source licenses",
    intro:
      "AI Resume Builder is built with free, open-source software. Their licenses let anyone use them, including in commercial apps, as long as their copyright notices are kept. The full license texts are included with the app.",
    groups: [
      {
        title: "App framework",
        items: "React, Redux Toolkit, React Router, Zustand",
        license: "MIT",
      },
      {
        title: "Design and icons",
        items: "Material UI, Material Icons, Lucide icons",
        license: "MIT, ISC",
      },
      {
        title: "Fonts",
        items: "Inter, Literata, JetBrains Mono, Space Grotesk",
        license: "SIL Open Font License 1.1",
      },
      {
        title: "PDF export",
        items: "html2canvas, jsPDF",
        license: "MIT",
      },
      {
        title: "Other small libraries",
        items: "Day.js, Emotion, DOMPurify and others",
        license: "MIT, BSD, Apache 2.0",
      },
    ],
    ai: "The AI model (Gemini Nano) is part of Google Chrome and is not shipped with this app. Its use is covered by Google's terms.",
    close: "Close",
  },
  aiErrors: {
    gotIt: "Got it",
    unsupported: {
      title: "AI not available in this browser",
      subtitle: "Unsupported browser",
      description:
        "The AI features run inside Google Chrome on your computer, for free. Open this page in a recent desktop version of Chrome to use them.",
    },
    unsupported_device: {
      title: "AI not available on this computer",
      subtitle: "Unsupported device",
      description:
        "Your Chrome supports the AI features, but this computer doesn't meet their requirements: a capable graphics card or enough memory, and free disk space for the model. Try another computer to use them.",
    },
    download_failed: {
      title: "The AI model couldn't download",
      subtitle: "Download failed",
      description:
        "Chrome downloads the AI model once before the first use, and the download didn't finish. Check that your computer has at least 22 GB of free disk space and a stable internet connection, then try again. You can see the model's status in Chrome at chrome://on-device-internals.",
    },
    request_failed: {
      title: "AI request failed",
      subtitle: "Something went wrong",
      description:
        "The AI couldn't complete the request. Please try again in a moment.",
    },
  },
  moreContextDialog: {
    title: "More context needed",
    subtitle: "AI context checklist",
    aiResponse: "AI Response",
    description:
      "The AI needs a real achievement to work with. Try describing a task, result, or responsibility from your role - even a rough sentence is enough.",
    structureLabel: "Recommended structure",
    structureExample:
      '"[Action verb] the [task/project] which resulted in [outcome or improvement]."',
    hint: "Once you expand your description, tap the AI button again.",
    cta: "I'll add more details now",
    invalidTitle:
      'We couldn\'t link "{title}" to a profession. Enter your job title or a keyword about your work (a skill, tool or field) in English.',
    invalidVolunteerWork:
      'We couldn\'t tell what this volunteer work was about. Add the cause, field or organization in English (e.g. "Food bank volunteer" or "Animal shelter"), or describe what you did.',
    missingTitle:
      "Please add your professional title in Personal Info first, so the AI knows which skills fit your role.",
    noSkills:
      "The AI couldn't find new skills for this title. Try again, or add a few skills yourself first.",
  },
};
