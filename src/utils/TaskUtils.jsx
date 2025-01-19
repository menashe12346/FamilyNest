import { updateReduxTask } from '../Redux/userSlice';
import { firebase } from "../../firebase";
import { useDispatch } from 'react-redux';

export const CreateNewTask = ({creatorID,assignedTo,taskID,title,description,startTime,endTime,startDate,endDate,type,reward,minAge}) =>{
    console.log("Details:",creatorID,assignedTo,taskID,title,description,startTime,endTime,type,reward,minAge)

     // Serialize start and end time to ISO strings (Date + Time)
  const serializedStartTime = startTime instanceof Date ? startTime.toISOString() : startTime;
  const serializedEndTime = endTime instanceof Date ? endTime.toISOString() : endTime;

    return{
        id:taskID,
        creatorID:creatorID,
        assignedTo:assignedTo,
        title:title,
        description:description,
        startTime:serializedStartTime,
        endTime:serializedEndTime,
        type:type,
        reward:reward,
        minAge:minAge,
        status:'NEW_TASK',
        chat:[]
    }
}

  // Determine the background image based on the task type
export const getBackgroundImage = ({type}) => {
    const backgroundImages = {
        2: require('../assets/images/cleaning.jpg'),
        1: require('../assets/images/outdoor.jpg'),
        3: require('../assets/images/laundry-pattern.jpg'),
        4: require('../assets/images/pet-pattern.jpg'),
        5: require('../assets/images/study.jpg'),
        6: require('../assets/images/dish-wash.jpg'),
        7: require('../assets/images/room-cleaning.jpg'),
      }

    switch (type) {
      case '1':
        return backgroundImages[1]
      case '2':
        return backgroundImages[2]
      case '3':
        return backgroundImages[3];
      case '4':
        return backgroundImages[4]
      case '5':
        return backgroundImages[5]
      case '6':
        return backgroundImages[6]
      case '7':
        return backgroundImages[7]
      default:
        return backgroundImages[7]
    }
  };

    // Determine the background image based on the task type
export const getTaskAnimations = ({type}) => {
  console.log("animationtype",type)
  const taskAnimations = {
      2: require('../assets/animations/cleaning.json'),
      1: require('../assets/animations/outdoor.json'),
      3: require('../assets/animations/laundry.json'),
      4: require('../assets/animations/dog-waiting.json'),
      5: require('../assets/animations/learning.json'),
      6: require('../assets/animations/other.json')
    }

  switch (type) {
    case '1':
      return taskAnimations[1]
    case '2':
      return taskAnimations[2]
    case '3':
      return taskAnimations[3];
    case '4':
      return taskAnimations[4]
    case '5':
      return taskAnimations[5]
    default:
      return
  }
};

export const taskTypes = {
    1: "Outdoor",
    2: "House-Cleaning",
    3: "Laundry",
    4: "Pet-care",
    5: "Studying",
    7: "Room-Cleaning",
    11: "Other",
  };
  

export const getNewTaskID = ({tasks})=>{
    let maxID = -1
    for (const task of tasks){
        maxID=Math.max(task.id , maxID)
    }
    return maxID+1
}

export const getTaskById = (tasks, id) => {
    // Find and return the task with the given ID
    return tasks.find((task) => task.id === id);
  };

export const updateTaskStatus = async ({user,task,status,dispatch = useDispatch()})=>{
  console.log('task status',status,user.tasks)
      try {
        const userDocRef = firebase.firestore().collection("users").doc(user.uid);
  
        // Fetch the current user document
        const doc = await userDocRef.get();
        if (doc.exists) {
        const data = doc.data();
        const tasks = data.tasks;
  
        // Find the task to update
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          tasks[taskIndex].status = status;
  
          // Update Firestore with the new task status
          await userDocRef.update({ tasks });
  
          // Update Redux
          dispatch(updateReduxTask({ ...task, status: status }));
  
          console.log("Task status updated successfully in Firestore and Redux.");
        } else {
          console.error("Task not found in Firestore.");
        }
        } else {
        console.error("User document not found.");
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }

}