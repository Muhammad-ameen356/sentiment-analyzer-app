import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { LoginReducer } from "store/reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({
  register: LoginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
