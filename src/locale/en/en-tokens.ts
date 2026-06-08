const SECTIONS = {
  sections: {
    personalInfo: {
      title: "Personal",
      enhanceButton: "Enhance",
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
          placeholder: "Key achievements...",
        },
      },
      aiButtons: {
        quantifyMetrics: "⊕ quantify metrics",
        strongerVerbs: "↑ stronger verbs",
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
  },
} as const;

export const enTokens = {
  app: {
    title: "CareerFlow AI",
    builder: "Builder",
    analysis: "Analysis",
    resume_sections: "RESUME SECTIONS",
    ai_optimized: "AI Optimized Engine",
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
    undo: "Undo",
  },
  settings: {
    title: "Settings",
    apiKey: "Anthropic API Key",
    apiKeyPlaceholder: "sk-ant-...",
    save: "Save",
    delete: "Delete Key",
    refresh: "Refresh",
    templates: "Templates",
    styles: "Styles",
    optimize_all: "Optimize All",
    optimize_resume: "Optimize Resume",
    optimizing: "Optimizing...",
  },
  errors: {
    missingKey: "Please add your API key in Settings",
    emptyField: "Field is empty",
    apiError: "Something went wrong. Please try again.",
    timeout: "Request timed out. Please try again.",
  },
  export: {
    export_pdf: "Export PDF",
    save_draft: "Save Draft",
  },
  confirmations: {
    newResume: "This will clear everything. Are you sure?",
  },
  personal: {},
};
