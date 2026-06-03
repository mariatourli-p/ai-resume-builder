import { cm } from "@/utils/cm";
import { memo, useMemo } from "react";

export type ViewProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const View = memo(function View({ className, ...props }: ViewProps) {
  const classNameUpdated = useMemo(
    () => cm(className, "view flex"),
    [className],
  );
  return <div className={classNameUpdated} {...props} />;
});
