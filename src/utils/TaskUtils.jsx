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
    }
}

export const getNewTaskID = ({tasks})=>{
    let maxID = -1
    for (const task of tasks){
        maxID=Math.max(task.id , maxID)
    }
    return maxID+1
}