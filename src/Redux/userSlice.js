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

    addReduxTask: (state, action) => {
      console.log('redux task update')
      state.user.tasks.push(action.payload); // Pushes a new task into the tasks array
    },
  },
});

// Exporting actions
export const { setUser, clearUser, setReduxProfiles ,addReduxTask} = userSlice.actions;
export default userSlice.reducer;