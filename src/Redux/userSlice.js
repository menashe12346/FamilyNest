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
      target:{},
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
        target:{},
      };
    },
    // Action to set the profiles array separately
    setReduxProfiles: (state, action) => {
      state.user.profiles = action.payload;
    }, 
    updateProfile: (state, action) => {
      const updatedProfile = action.payload;
      console.log("Updating profile with ID:", updatedProfile.id);
      
      const profileIndex = state.user.profiles.findIndex((p) => p.id === updatedProfile.id);
      if (profileIndex !== -1) {
        console.log("Profile found. Updating profile:", state.user.profiles[profileIndex]);
        state.user.profiles[profileIndex] = { ...state.user.profiles[profileIndex], ...updatedProfile };
      } else {
        console.log("Profile not found. ID:", updatedProfile.id);
      }
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
      console.log("Updating reward with ID:", updatedReward.reward_id);
      
      const rewardIndex = state.user.rewards.findIndex((r) => r.reward_id === updatedReward.reward_id);
      if (rewardIndex !== -1) {
        console.log("Reward found. Updating reward:", state.user.rewards[rewardIndex]);
        state.user.rewards[rewardIndex] = { ...state.user.rewards[rewardIndex], ...updatedReward };
      } else {
        console.log("Reward not found. ID:", updatedReward.reward_id);
      }
    },
    // Action to set the target object
    setReduxTarget: (state, action) => {
      state.user.target = action.payload;
    },

    // Action to update the target object
    updateReduxTarget: (state, action) => {
      const updatedTarget = action.payload;
      state.user.target = { ...state.user.target, ...updatedTarget };
    },

    // Action to get the rewards array
    getReduxRewards: (state) => {
      return state.user.rewards;
    },

    // Action to get the profiles array
    getReduxProfiles: (state) => {
      return state.user.profiles;
    },
  },
});

// Exporting actions
export const { getReduxRewards,getReduxProfiles,setUser, clearUser, setReduxProfiles ,addReduxTask, updateReduxTask , updateReduxReward, setReduxRewards,setReduxTarget,updateReduxTarget ,updateProfile} = userSlice.actions;
export default userSlice.reducer;