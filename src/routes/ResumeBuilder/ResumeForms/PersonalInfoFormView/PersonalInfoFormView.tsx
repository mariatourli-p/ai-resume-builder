import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import {
  setPersonalInfo,
  updatePersonalInfoField,
  type PersonalInfoData,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, usePersonalInfoSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { useAI } from "@hooks/useAI";
import { useCallback } from "react";

export const PersonalInfoFormView = () => {
  const dispatch = useAppDispatch();
  const data = usePersonalInfoSelector((s) => s, shallowEqual);
  const { improve, isLoading: isEnhancing } = useAI();

  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      dispatch(updatePersonalInfoField({ field, value }));
    },
    [dispatch],
  );

  const handleEnhance = useCallback(async () => {
    const improved = await improve(
      AI_PROMPTS.smartRewrite as keyof typeof AI_PROMPTS,
      data.professionalSummary,
    );
    if (improved) {
      dispatch(setPersonalInfo({ ...data, professionalSummary: improved }));
    }
  }, [improve, data, dispatch]);

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
