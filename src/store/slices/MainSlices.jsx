import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = mainSlice.actions;
export default mainSlice.reducer;
