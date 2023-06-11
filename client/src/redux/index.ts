import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./menuSlice";
import YearReducer from "./yearSlice";
import DriverReducer from "./driverSlice";

const store = configureStore({
  reducer: {
    menu: MenuReducer,
    year: YearReducer,
    driver: DriverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
