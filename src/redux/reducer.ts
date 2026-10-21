import { combineReducers } from "@reduxjs/toolkit";
import { resumeReducer } from "./resume";

const projectReducers = {
  resume: resumeReducer,
};

const appReducer = combineReducers({
  ...projectReducers,
});

type AppState = ReturnType<typeof appReducer>;

export const reducer = (
  state: AppState | undefined,
  action: { type: string },
): AppState => {
  if (action.type === "RESET_ALL") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
