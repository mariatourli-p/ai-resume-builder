import { combineReducers } from "@reduxjs/toolkit";
import { resumeReducer } from "./resume/resume-reducer";

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

export const initialState = appReducer(undefined, { type: "@@INIT" });

export type RootState = ReturnType<typeof appReducer>;
