import {
  WorkExperienceForm,
  type WorkExperienceEntry,
} from "@/components/Forms/WorkExperienceForm";
import { useState, useCallback } from "react";

export const WorkExperienceFormView = () => {
  const [entries, setEntries] = useState<WorkExperienceEntry[]>([]);
  const [improvingIds, setImprovingIds] = useState<Set<string>>(new Set());

  const handleAdd = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        roleTitle: "",
        company: "",
        duration: "",
        location: "",
        achievements: "",
      },
    ]);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleChange = useCallback(
    (
      id: string,
      field: keyof Omit<WorkExperienceEntry, "id">,
      value: string,
    ) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
      );
    },
    [],
  );

  const handleImprove = useCallback(async (id: string) => {
    setImprovingIds((prev) => new Set(prev).add(id));
    // TODO: call AI improve API
    setImprovingIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
  }, []);

  return (
    <WorkExperienceForm
      entries={entries}
      improvingIds={improvingIds}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onImprove={handleImprove}
    />
  );
};
