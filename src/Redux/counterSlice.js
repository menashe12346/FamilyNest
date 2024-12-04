import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_email: '',    
    user_name: '',         
    user_picture: 'https://cdn-icons-png.flaticon.com/256/149/149071.png',
    user_age: 0,
  },
  reducers: {
    Set_user_email: (state, action) => {
      state.user_email = action.payload;
    },
    Set_user_name: (state, action) => {
      state.user_name = action.payload;
    },
    Set_user_picture: (state, action) => {
      state.user_picture = action.payload;
    },
    Set_user_age: (state, action) => {
      state.user_age = action.payload;
    },
  },
});


export const {
  Set_user_email,
  Set_user_name,
  Set_user_picture,
  Set_user_age,
} = userSlice.actions;

export const userProfileReducer = userSlice.reducer;
