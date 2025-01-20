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
      rewards: [],
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
        rewards: [],
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
    // פעולה לעדכון מטלה קיימת
    updateReduxTask: (state, action) => {
      const updatedTask = action.payload;
      console.log("Updating task with ID:", updatedTask.id);
      
      const taskIndex = state.user.tasks.findIndex((t) => t.id === updatedTask.id);
      if (taskIndex !== -1) {
        console.log("Task found. Updating task:", state.user.tasks[taskIndex]);
        state.user.tasks[taskIndex] = { ...state.user.tasks[taskIndex], ...updatedTask };
      } else {
        console.log("Task not found. ID:", updatedTask.id);
      }
    },    

    // Action to set the rewards array separately
    setReduxRewards: (state, action) => {
      state.user.rewards = action.payload;
    },

    // Action to update a specific reward item
    updateReduxReward: (state, action) => {
      const updatedReward = action.payload;
      console.log("Updating reward with ID:", updatedReward.id);
      
      const rewardIndex = state.user.rewards.findIndex((r) => r.id === updatedReward.id);
      if (rewardIndex !== -1) {
        console.log("Reward found. Updating reward:", state.user.rewards[rewardIndex]);
        state.user.rewards[rewardIndex] = { ...state.user.rewards[rewardIndex], ...updatedReward };
      } else {
        console.log("Reward not found. ID:", updatedReward.id);
      }
    },
  },
});

// Exporting actions
export const { setUser, clearUser, setReduxProfiles ,addReduxTask, updateReduxTask , updateReduxReward, setReduxRewards} = userSlice.actions;
export default userSlice.reducer;