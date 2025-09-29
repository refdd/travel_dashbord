import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true, // Default state for the drawer
};

export const drawerSlice = createSlice({
  name: "ChangeDrawer",
  initialState,
  reducers: {
    handleChangedrawer: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleChangedrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
