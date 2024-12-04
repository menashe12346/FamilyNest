import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    family_name: '',         
    username: '',    
    picture: 'https://cdn-icons-png.flaticon.com/256/149/149071.png',
    age: 0,
  },
  reducers: {
    Set_family_name: (state, action) => {
      state.family_name = action.payload;
    },
    Set_username: (state, action) => {
      state.username = action.payload;
    },
    Set_picture: (state, action) => {
      state.user_picture = action.payload;
    },
    Set_age: (state, action) => {
      state.age = action.payload;
    },
  },
});


export const {
  Set_family_name,
  Set_username,
  Set_picture,
  Set_age,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
