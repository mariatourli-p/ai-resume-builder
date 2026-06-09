import {
  PersonalInfoForm,
  type PersonalInfoData,
} from "@/components/Forms/PersonalInfoForm";
import { useCallback, useState } from "react";
import { useAI } from "@hooks/useAI";
import { AI_PROMPTS } from "@/services/aiPrompts";

const initialData: PersonalInfoData = {
  fullName: "",
  professionalTitle: "",
  emailAddress: "",
  phone: "",
  location: "",
  portfolio: "",
  professionalSummary: "",
};

export const PersonalInfoFormView = () => {
  const [data, setData] = useState<PersonalInfoData>(initialData);
  const { improve, isLoading: isEnhancing } = useAI();

  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleEnhance = useCallback(async () => {
    const improved = await improve(
      AI_PROMPTS.smartRewrite as keyof typeof AI_PROMPTS,
      data.professionalSummary,
    );
    if (improved)
      setData((prev) => ({ ...prev, professionalSummary: improved }));
  }, [improve, data.professionalSummary]);

  return (
    <PersonalInfoForm
      data={data}
      isEnhancing={isEnhancing}
      isRewriting={isEnhancing}
      isEnhanceDisabled={false}
      onChange={handleChange}
      onEnhance={handleEnhance}
      onSmartRewrite={handleEnhance}
    />
  );
};
