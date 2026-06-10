import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore, shallowEqual } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { reducer, type RootState } from "./reducer";

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const persistedReducer = persistReducer(
  { key: "resume_builder", storage },
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

export { shallowEqual };
