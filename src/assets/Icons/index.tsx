import {
  User,
  Briefcase,
  GraduationCap,
  Brain,
  Sparkles,
  Download,
  Settings,
  Plus,
  Trash2,
  LayoutTemplate,
  RefreshCw,
  HandHeart,
  Presentation,
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

export const IconVolunteering = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <HandHeart size={size} {...props} />
);

export const IconCourses = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Presentation size={size} {...props} />
);

export const IconSkills = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Brain size={size} {...props} />
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

export const IconDelete = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <Trash2 size={size} {...props} />
);

export const IconTemplate = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <LayoutTemplate size={size} {...props} />
);

export const IconRefresh = ({ size = ICON_SIZE, ...props }: IconProps) => (
  <RefreshCw size={size} {...props} />
);
