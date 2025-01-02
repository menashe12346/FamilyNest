import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uid: '',
      familyName: '',
      userName: '',
      email: '',
      password: '',
      phoneNumber: '',
      partnerEmail: '',
      profiles: [],
      tasks: [],
    },
  },
  reducers: {
    // Action to set the entire user object at once
    setUser: (state, action) => {
      state.user = action.payload;  // Replaces the entire user object with the one passed in the action
    },
    // Clear user data
    clearUser: (state) => {
      state.user = {
        uid: '',
        familyName: '',
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        partnerEmail: '',
        profiles: [],
        tasks: [],
      };
    },
    // Action to set the profiles array separately
    setReduxProfiles: (state, action) => {
      state.user.profiles = action.payload;
    }, 
  },
});

// Exporting actions
export const { setUser, clearUser, setReduxProfiles } = userSlice.actions;
export default userSlice.reducer;