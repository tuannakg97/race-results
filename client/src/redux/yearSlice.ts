import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface YearSliceInitialState {
  value: string;
}
const initialState: YearSliceInitialState = {
  value: "2023",
};

export const yearSlice = createSlice({
  name: "year",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Part 4
export const { change } = yearSlice.actions;
export default yearSlice.reducer;
