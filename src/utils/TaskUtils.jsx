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
        status:'NEW_TASK'
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
        6: require('../assets/images/dish-wash.jpg')
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