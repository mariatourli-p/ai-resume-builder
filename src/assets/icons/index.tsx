export * from ".";
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

export const IconPersonal = () => <User size={ICON_SIZE} />;
export const IconExperience = () => <Briefcase size={ICON_SIZE} />;
export const IconEducation = () => <GraduationCap size={ICON_SIZE} />;
export const IconSkills = () => <Brain size={ICON_SIZE} />;
export const IconProjects = () => <FolderOpen size={ICON_SIZE} />;

export const IconAI = () => <Sparkles size={ICON_SIZE} />;
export const IconDownload = () => <Download size={ICON_SIZE} />;
export const IconSettings = () => <Settings size={ICON_SIZE} />;
export const IconAdd = () => <Plus size={ICON_SIZE} />;
export const IconUndo = () => <Undo2 size={ICON_SIZE} />;
export const IconSaved = () => <Check size={ICON_SIZE} />;
export const IconDelete = () => <Trash2 size={ICON_SIZE} />;
export const IconError = () => <AlertCircle size={ICON_SIZE} />;

export const IconEmail = () => <Mail size={ICON_SIZE} />;
export const IconLocation = () => <MapPin size={ICON_SIZE} />;
