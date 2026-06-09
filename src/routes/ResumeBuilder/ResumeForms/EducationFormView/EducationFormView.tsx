import { useState, useCallback } from "react";
import {
  EducationForm,
  type EducationEntry,
} from "@/components/Forms/EducationForm";

export const EducationFormView = () => {
  const [entries, setEntries] = useState<EducationEntry[]>([]);

  const handleAdd = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        graduationDate: "",
        location: "",
      },
    ]);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleChange = useCallback(
    (id: string, field: keyof Omit<EducationEntry, "id">, value: string) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
      );
    },
    [],
  );

  return (
    <EducationForm
      entries={entries}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
    />
  );
};
