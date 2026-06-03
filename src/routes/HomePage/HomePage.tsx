import { HomePageProvider } from "./HomePageProvider";
import { HomePageView } from "./HomePageView";

export const HomePage = () => {
  return (
    <HomePageProvider>
      <HomePageView />
    </HomePageProvider>
  );
};
