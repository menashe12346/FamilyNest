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
  },
});

// Exporting actions
export const { setUser, clearUser, setReduxProfiles ,addReduxTask, updateReduxTask} = userSlice.actions;
export default userSlice.reducer;