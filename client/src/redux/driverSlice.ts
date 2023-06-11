// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Part 2
export interface DriverSliceInitialState {
  value: string;
}
const initialState: DriverSliceInitialState = {
  value: "",
};

// Part 3
export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Part 4
export const { change } = driverSlice.actions;
export default driverSlice.reducer;
