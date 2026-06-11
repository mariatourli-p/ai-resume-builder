import { DEFAULT_ACCENT_COLOR } from "@/components/AppBars/SectionsBar/BrandingColors/constants";
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
};

const persistedReducer = persistReducer(
  {
    key: "resume_builder",
    storage,
    version: 1,
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
