// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Part 2
export interface MenuSliceInitialState {
  value: string;
}
const initialState: MenuSliceInitialState = {
  value: "drivers",
};

// Part 3
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Part 4
export const { change } = menuSlice.actions;
export default menuSlice.reducer;
