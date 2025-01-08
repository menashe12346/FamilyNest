export const CreateNewTask = ({creatorID,assignedTo,taskID,title,description,startTime,endTime,type,reward,minAge}) =>{
    return{
        id:taskID,
        creatorID:creatorID,
        assignedTo:assignedTo,
        title:title,
        description:description,
        startTime:startTime,
        endTime:endTime,
        type:type,
        reward:reward,
        minAge:minAge,
        status:'NEW_TASK'
    }
}

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