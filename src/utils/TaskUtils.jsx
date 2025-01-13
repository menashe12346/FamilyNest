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
    console.log("idss",tasks.tasks)
    let maxID = -1
    for (const task of tasks){
        maxID=Math.max(task.id , maxID)
    }
    return maxID+1
}