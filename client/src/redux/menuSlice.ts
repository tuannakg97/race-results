import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuSliceInitialState {
  value: string;
}
const initialState: MenuSliceInitialState = {
  value: "drivers",
};

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
