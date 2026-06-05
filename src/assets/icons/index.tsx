import {
  User,
  Briefcase,
  GraduationCap,
  Brain,
  Sparkles,
  Download,
  Settings,
  Plus,
  Undo2,
  Check,
  Trash2,
  Mail,
  MapPin,
  FolderOpen,
  AlertCircle,
} from "lucide-react";

const ICON_SIZE = 20;

type IconProps = {
  size?: number;
  className?: string;
};

// ── Section Icons ─────────────────────────────────────────────────────────────

export const IconPersonal = ({ size = ICON_SIZE, className }: IconProps) => (
  <User size={size} className={className} />
);

export const IconExperience = ({ size = ICON_SIZE, className }: IconProps) => (
  <Briefcase size={size} className={className} />
);

export const IconEducation = ({ size = ICON_SIZE, className }: IconProps) => (
  <GraduationCap size={size} className={className} />
);

export const IconSkills = ({ size = ICON_SIZE, className }: IconProps) => (
  <Brain size={size} className={className} />
);

export const IconProjects = ({ size = ICON_SIZE, className }: IconProps) => (
  <FolderOpen size={size} className={className} />
);

// ── Action Icons ──────────────────────────────────────────────────────────────

export const IconAI = ({ size = ICON_SIZE, className }: IconProps) => (
  <Sparkles size={size} className={className} />
);

export const IconDownload = ({ size = ICON_SIZE, className }: IconProps) => (
  <Download size={size} className={className} />
);

export const IconSettings = ({ size = ICON_SIZE, className }: IconProps) => (
  <Settings size={size} className={className} />
);

export const IconAdd = ({ size = ICON_SIZE, className }: IconProps) => (
  <Plus size={size} className={className} />
);

export const IconUndo = ({ size = ICON_SIZE, className }: IconProps) => (
  <Undo2 size={size} className={className} />
);

export const IconSaved = ({ size = ICON_SIZE, className }: IconProps) => (
  <Check size={size} className={className} />
);

export const IconDelete = ({ size = ICON_SIZE, className }: IconProps) => (
  <Trash2 size={size} className={className} />
);

export const IconError = ({ size = ICON_SIZE, className }: IconProps) => (
  <AlertCircle size={size} className={className} />
);

// ── Contact Icons ─────────────────────────────────────────────────────────────

export const IconEmail = ({ size = ICON_SIZE, className }: IconProps) => (
  <Mail size={size} className={className} />
);

export const IconLocation = ({ size = ICON_SIZE, className }: IconProps) => (
  <MapPin size={size} className={className} />
);

import { LayoutTemplate } from "lucide-react";

export const IconTemplate = ({ size = ICON_SIZE, className }: IconProps) => (
  <LayoutTemplate size={size} className={className} />
);
