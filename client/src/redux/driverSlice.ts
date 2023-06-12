import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DriverSliceInitialState {
  value: string;
}
const initialState: DriverSliceInitialState = {
  value: "",
};

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
