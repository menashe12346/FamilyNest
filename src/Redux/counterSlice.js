// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
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
      picture: 'https://cdn-icons-png.flaticon.com/256/149/149071.png', // Default picture
      age: 0,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set full user object
    },
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
        picture: 'https://cdn-icons-png.flaticon.com/256/149/149071.png',
        age: 0,
      }; // Clear user data
    },
    setProfiles: (state, action) => {
      state.user.profiles = action.payload; // Set profiles
    },
    setPicture: (state, action) => {
      state.user.picture = action.payload; // Set profile picture
    },
    setAge: (state, action) => {
      state.user.age = action.payload; // Set user's age
    },
  },
});

export const { setUser, clearUser, setProfiles, setPicture, setAge } = userSlice.actions;

export default userSlice.reducer;
