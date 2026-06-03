import { NavBar } from "@/components/NavBar";
import { View } from "@/components/View";

export const HomePageView = () => {
  return (
    <View className="border border-red-500 bg-blue-100">
      <NavBar title="Profiler" storedInfoStatus={"saved"} />
    </View>
  );
};
