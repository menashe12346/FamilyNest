import { createSlice } from "@reduxjs/toolkit";

const selectedProfileSlice = createSlice({
  name: "selectedProfile",
  initialState: {
    selectedProfileId: null, // This will hold the focused profile ID
  },
  reducers: {
    // Action to set the selected profile ID
    setSelectedProfileId: (state, action) => {
      state.selectedProfileId = action.payload;
      console.log('selectedProfileId',state.selectedProfileId)
    },
    // Action to reset the selected profile ID (if needed)
    clearSelectedProfileId: (state) => {
      state.selectedProfileId = null;
    },
  },
});

// Exporting actions
export const { setSelectedProfileId, clearSelectedProfileId } = selectedProfileSlice.actions;
export default selectedProfileSlice.reducer;
