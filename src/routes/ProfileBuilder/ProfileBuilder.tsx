import { ProfileBuilderProvider } from "./ProfileBuilderProvider";
import { ProfileBuilderView } from "./ProfileBuilderView";

export const ProfileBuilder = () => {
  return (
    <ProfileBuilderProvider>
      <ProfileBuilderView />
    </ProfileBuilderProvider>
  );
};
