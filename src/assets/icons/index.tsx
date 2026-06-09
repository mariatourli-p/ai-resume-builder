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
  LayoutTemplate,
  RefreshCw,
  History,
  ChevronUp,
  ChevronDown,
  Pencil,
} from "lucide-react";

const ICON_SIZE = 20;

type IconProps = {
  size?: number;
} & React.SVGProps<SVGSVGElement>;

// ── Section Icons ─────────────────────────────────────────────────────────────

export const IconPersonal = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <User size={size} {...props} />
);

export const IconExperience = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Briefcase size={size} {...props} />
);

export const IconEducation = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <GraduationCap size={size} {...props} />
);

export const IconSkills = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Brain size={size} {...props} />
);

export const IconProjects = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <FolderOpen size={size} {...props} />
);

// ── Action Icons ──────────────────────────────────────────────────────────────

export const IconAI = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Sparkles size={size} {...props} />
);

export const IconDownload = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Download size={size} {...props} />
);

export const IconSettings = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Settings size={size} {...props} />
);

export const IconAdd = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Plus size={size} {...props} />
);

export const IconUndo = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Undo2 size={size} {...props} />
);

export const IconSaved = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Check size={size} {...props} />
);

export const IconDelete = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Trash2 size={size} {...props} />
);

export const IconError = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <AlertCircle size={size} {...props} />
);

// ── Contact Icons ─────────────────────────────────────────────────────────────

export const IconEmail = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Mail size={size} {...props} />
);

export const IconLocation = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <MapPin size={size} {...props} />
);

export const IconTemplate = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <LayoutTemplate size={size} {...props} />
);

export const IconHistory = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <History size={size} {...props} />
);

export const IconRefresh = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <RefreshCw size={size} {...props} />
);

export const IconChevronUp = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <ChevronUp size={size} {...props} />
);

export const IconChevronDown = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <ChevronDown size={size} {...props} />
);

export const IconEdit = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Pencil size={size} {...props} />
);
