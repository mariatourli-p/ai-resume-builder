import { initialState } from "@/redux/reducer";
import { useAppSelector } from "@/redux/store";
import { isEqual } from "lodash";

export const useIsDefaultState = () =>
  useAppSelector((state) => isEqual(state.resume, initialState.resume));
