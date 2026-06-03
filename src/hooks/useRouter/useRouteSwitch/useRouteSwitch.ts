import { useRouter } from "../useRouter";

export const useRouteSwitch = () => {
  const context = useRouter();

  if (!context) {
    throw new Error("useRouteSwitch must be used within a <RouteSwitch />");
  }
  return context;
};
