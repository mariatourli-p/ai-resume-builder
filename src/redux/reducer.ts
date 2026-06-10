import { combineReducers } from "@reduxjs/toolkit";
import { resumeReducer } from "./resume/resume-reducer";

const projectReducers = {
  resume: resumeReducer, // Reducer for resume data
};

export const reducer = combineReducers({
  ...projectReducers,
});

export type RootState = ReturnType<typeof reducer>;
