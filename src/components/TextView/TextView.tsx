import { memo, useMemo } from "react";
import { View, type ViewProps } from "../View/View";
import { cm } from "@/utils/cm";

export type TextViewProps = {
  /** The text to display */
  txt: string;
} & ViewProps;

export const TextView = memo(function TextView({
  txt,
  className,
  ...props
}: TextViewProps) {
  const cl = useMemo(() => cm("textView inline-block", className), [className]);

  return (
    <>
      {txt && (
        <View data-component="TextView" className={cl} {...props}>
          {txt}
        </View>
      )}
    </>
  );
});
