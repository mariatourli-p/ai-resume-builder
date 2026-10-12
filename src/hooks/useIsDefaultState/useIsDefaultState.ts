import { initialState } from "@/redux/reducer";
import { useAppSelector } from "@/redux/store";
import isEqual from "lodash/isEqual";

export const useIsDefaultState = () =>
  useAppSelector((state) => isEqual(state.resume, initialState.resume));
