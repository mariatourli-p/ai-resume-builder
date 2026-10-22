import { DEFAULT_ACCENT_COLOR, LEGACY_ACCENT_COLORS } from "@/theme";
import { configureStore } from "@reduxjs/toolkit";
import { shallowEqual, useDispatch, useSelector, useStore } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  persistReducer,
  persistStore,
} from "redux-persist";
import { reducer, type RootState } from "./reducer";

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

type MigrationState = {
  _persist: { version: number; rehydrated: boolean };
  resume: {
    personalInfo: Record<string, string>;
    skills: string[];
    workExperience: unknown[];
    education: unknown[];
    volunteering?: unknown[];
    courses?: unknown[];
    accentColor?: string;
  };
};

const migrations = {
  1: (state: MigrationState): MigrationState => ({
    ...state,
    resume: {
      ...state.resume,
      accentColor: state.resume.accentColor ?? DEFAULT_ACCENT_COLOR,
    },
  }),
  // Resumes saved before photos existed
  2: (state: MigrationState): MigrationState => ({
    ...state,
    resume: {
      ...state.resume,
      personalInfo: { photo: "", ...state.resume.personalInfo },
    },
  }),
  /**
   * Work dates became start / end months. The old free-text duration
   * ("3yrs", "2020 - Present") can't be turned into months, so it is dropped.
   */
  3: (state: MigrationState): MigrationState => ({
    ...state,
    resume: {
      ...state.resume,
      workExperience: (
        state.resume.workExperience as Record<string, unknown>[]
      ).map((entry) => {
        const migrated: Record<string, unknown> = {
          startDate: "",
          endDate: "",
          ...entry,
        };
        delete migrated.duration;
        return migrated;
      }),
    },
  }),
  // Volunteering and Courses & Seminars sections were added
  4: (state: MigrationState): MigrationState => ({
    ...state,
    resume: { volunteering: [], courses: [], ...state.resume },
  }),
  // The bright accents were replaced by formal ones
  5: (state: MigrationState): MigrationState => ({
    ...state,
    resume: {
      ...state.resume,
      accentColor:
        LEGACY_ACCENT_COLORS[state.resume.accentColor ?? ""] ??
        DEFAULT_ACCENT_COLOR,
    },
  }),
  // Courses got a description the user writes
  6: (state: MigrationState): MigrationState => ({
    ...state,
    resume: {
      ...state.resume,
      courses: (state.resume.courses ?? []).map((entry) => ({
        description: "",
        ...(entry as Record<string, unknown>),
      })),
    },
  }),
};

const persistedReducer = persistReducer(
  {
    key: "resume_builder",
    storage,
    /**
     * Saves at most twice a second instead of on every key press: the whole
     * resume (photo included) is written each time
     */
    throttle: 500,
    version: 6,
    migrate: createMigrate(
      migrations as unknown as Parameters<typeof createMigrate>[0],
      {
        debug: false,
      },
    ),
  },
  reducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Saves right away when the tab is hidden or closed, so no key press is lost
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") void persistor.flush();
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = <T>(
  selector: (state: RootState) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T => useSelector(selector, equalityFn);

export const useAppStore = useStore.withTypes<AppStore>();

export const resetAll = () => ({ type: "RESET_ALL" as const });

export { shallowEqual };
