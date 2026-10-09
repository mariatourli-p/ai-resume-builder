import { useCallback, useState } from "react";

const normalize = (title: string) => title.trim().toLowerCase();

/**
 * Remembers which job title each AI-written field (summary, achievements)
 * belongs to, so old text is only brought back while the title is the same.
 *
 * @param initial - Title of each text when the form opens, keyed by field
 *   (e.g. `{ summary: data.professionalTitle }`). Only read on first render.
 *
 * @example
 * const { setTextTitle, isSameTitle } = useTextTitles({ summary: title });
 * setSummary(improved ?? (isSameTitle("summary", title) ? previous : ""));
 */
export const useTextTitles = (initial: Record<string, string>) => {
  // Not render state: it only decides what to restore after an AI request
  const [titles] = useState(
    () =>
      new Map(
        Object.entries(initial).map(([key, title]) => [key, normalize(title)]),
      ),
  );

  /** Call when the text is written for `title` - by the user or the AI */
  const setTextTitle = useCallback(
    (key: string, title: string) => titles.set(key, normalize(title)),
    [titles],
  );

  /** Whether the text under `key` was written for this title */
  const isSameTitle = useCallback(
    (key: string, title: string) =>
      (titles.get(key) ?? "") === normalize(title),
    [titles],
  );

  return { setTextTitle, isSameTitle };
};
