import { configureStore } from '@reduxjs/toolkit';
import { userProfileReducer } from './counterSlice';

const store = configureStore({
  reducer: {
    user_profile: userProfileReducer,
  },
});

export default store;