import { View, Text } from 'react-native'
import React from 'react'
import { BackgroundImage } from '@rneui/base'

const TaskComponents = ({creatorID,assignedTo,taskID,title,description,startTime,endTime,type,reward,minAge}) => {
  return (
    <View>
      <Text>TaskComponents</Text>
    </View>
  )
}

const styles = styleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        color:'red'
    }

})

export default TaskComponents