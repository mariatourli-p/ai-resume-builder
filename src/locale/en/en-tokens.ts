const SECTIONS = {
  sections: {
    personalInfo: {
      title: "Personal Info",
      fields: {
        fullName: {
          label: "Full Name",
          placeholder: "John Doe",
        },
        professionalTitle: {
          label: "Professional Title",
          placeholder: "Senior Product Designer",
        },
        professionalSummary: {
          label: "Professional Summary",
          placeholder: "Tell your story...",
          aiButton: "Rewrite with AI",
          hint: "Use 2–3 impact sentences.",
        },
      },
    },

    workExperience: {
      title: "Work Experience",
      addButton: "Add Experience",
      fields: {
        jobTitle: {
          placeholder: "Principal Designer",
        },
        company: {
          placeholder: "TechFlow Corp",
        },
        achievements: {
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

    education: {
      title: "Education",
      addButton: "Add Degree",
      fields: {
        institution: {
          placeholder: "Institution",
        },
        degreeField: {
          placeholder: "Degree / Field",
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
    title: "CareerFlow",
    builder: "Builder",
    analysis: "Analysis",
    resume_sections: "RESUME SECTIONS",
    ai_optimized: "AI Optimized Engine",
    projects: "Projects",
  },
  nav: {
    settings: "Settings",
    newResume: "New Resume",
    download: "Download PDF",
  },
  sections: SECTIONS.sections,
  ai: {
    improve: "✨ Improve with AI",
    suggest: "✨ Suggest skills with AI",
    loading: "Improving...",
    suggesting: "Suggesting skills...",
    generateAchievements: "Generate Achievements",
    generating: "Generating...",
    rewriting: "Rewriting...",
    smartRewrite: "Smart Rewrite",
    undo: "Undo",
  },
  settings: {
    title: "Settings",
    aiTitle: "AI Assistant",
    aiFooter:
      "Free for everyone. The AI runs inside Chrome on your computer, so your resume is never sent to an AI service.",
    save: "Save",
    refresh: "Refresh",
    templates: "Templates",
    styles: "Styles",
    optimize_all: "Optimize All",
    optimize_resume: "Optimize Resume",
    optimizing: "Optimizing...",
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
  },
  errors: {
    emptyField: "Field is empty",
    apiError: "Something went wrong. Please try again.",
    timeout: "Request timed out. Please try again.",
  },
  export: {
    export_pdf: "Export PDF",
    save_draft: "Save Draft",
    draft_saved: "Draft saved in live memory",
  },
  confirmations: {
    newResume: "This will clear everything. Are you sure?",
  },
  personal: {},
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
    description:
      "The AI needs a real achievement to work with. Try describing a task, result, or responsibility from your role - even a rough sentence is enough.",
    structureLabel: "Recommended structure",
    structureExample:
      '"[Action verb] the [task/project] which resulted in [outcome or improvement]."',
    hint: "Once you expand your description, tap the AI button again.",
    cta: "I'll add more details now",
    invalidTitle:
      "We couldn't link \"{title}\" to a profession. Enter your job title or a keyword about your work (a skill, tool or field) in English.",
    missingTitle:
      "Please add your professional title in Personal Info first, so the AI knows which skills fit your role.",
    noSkills:
      "The AI couldn't find new skills for this title. Try again, or add a few skills yourself first.",
  },
};
