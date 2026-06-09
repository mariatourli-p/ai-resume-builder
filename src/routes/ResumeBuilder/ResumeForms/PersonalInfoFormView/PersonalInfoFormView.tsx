import {
  PersonalInfoForm,
  type PersonalInfoData,
} from "@/components/Forms/PersonalInfoForm";
import { useCallback, useState } from "react";

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
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleEnhance = useCallback(async () => {
    setIsEnhancing(true);
    // TODO: call AI enhance API
    setIsEnhancing(false);
  }, []);

  const handleSmartRewrite = useCallback(async () => {
    setIsRewriting(true);
    // TODO: call AI rewrite API
    setIsRewriting(false);
  }, []);

  return (
    <PersonalInfoForm
      data={data}
      isEnhancing={isEnhancing}
      isRewriting={isRewriting}
      isEnhanceDisabled={false}
      onChange={handleChange}
      onEnhance={handleEnhance}
      onSmartRewrite={handleSmartRewrite}
    />
  );
};
