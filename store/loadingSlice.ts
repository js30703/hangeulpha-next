import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean =false

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    start: (state) => {
      state = true;
    },
    end: (state) => {
      state = false;
    },

  },
});

// Action creators are generated for each case reducer function
export const { start, end } = loadingSlice.actions;

export default loadingSlice.reducer;