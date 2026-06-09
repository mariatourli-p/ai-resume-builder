import { ResumeBuilderProvider } from "./ResumeBuilderProvider";
import {
  ResumeBuilderView,
  type ResumeBuilderViewProps,
} from "./ResumeBuilderView";

export const ResumeBuilder = ({ sx }: ResumeBuilderViewProps) => {
  return (
    <ResumeBuilderProvider>
      <ResumeBuilderView sx={sx} />
    </ResumeBuilderProvider>
  );
};
