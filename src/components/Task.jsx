import { View, Text , StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { calculateFontSize } from '../utils/FontUtils'
import CountdownTimer from './CountdownTimer';
import { getSecondsRemaining } from '../utils/TimeUtils';
import { getProfileById } from '../utils/ProfileUtils';
import { taskTypes } from '../utils/TaskUtils';
import ProfileBar from './ProfileBar';

const Task = ({task}) => {
  task=task.item
  const assignedTo = getProfileById(null,task.assignedTo)
  description=task.description.slice(0,100)
  console.log('my task1',task)
  return (
    <LinearGradient style={styles.modalContent} colors={['red','yellow']}>
      <View style={{alignItems:'center',alignContent:'center',flexDirection:'row'}}>
        <Text style={styles.nameText}>{assignedTo.name}</Text>
        <CountdownTimer initialSeconds={getSecondsRemaining(task.endTime)}/>
      </View>
      <View style={styles.container}>
        <View style={{alignContent:'center',flexDirection:'row'}}>
          <Text style={styles.instText}>{task.title}</Text>
        </View>
        <Text style={styles.typeText}>Type: {taskTypes[task.type]}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    width: 180,
    height:150,
    //paddingStart: "2%",
    //paddingEnd: "2%",
    borderRadius: 10,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 3,
    marginTop: "1%",
    flexDirection: "column",
  },
  taskTitle: {
    backgroundColor: "white",
    marginTop: "2%",
    borderRadius: 10,
    elevation: 10,
  },
  roundedImage: {
    borderWidth: 2,
    width: 50, // Increased width
    height: 50, // Increased height
    borderRadius: 20, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },
  instText: {
    fontSize: calculateFontSize(18),
    fontFamily: "Fredoka-Bold",
    backgroundColor: "transparent",
  },
  columnView: {
    width: "75%",
    height: "60%",
  },description: {
    fontFamily:'Fredoka-Bold',
  },
  descriptionView: {
    backgroundColor: "white",
    marginTop: "2%",
    height: "22%",
    width: "100%",
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    color: "white",
    borderRadius: 7,
    height: 30,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  dateTime: {
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    height: "50%",
    width: "115%",
    justifyContent: "space-around",
  },
  detailText: {
    fontFamily: "Fredoka-Bold",
    textAlign: "center",
  },
  dropdownList: {
    alignItems: "center",
  },
  taskType: {
    width: "60%",
    height:"70%",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 8,
    justifyContent:'center',
    marginStart:'1%'
  },reward:{
    marginHorizontal:5,
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center'
  },rewardImage:{
    resizeMode:'cover',
    height:40,
    width:40
  },container:{
    flexDirection:'column'
  },nameText:{
    fontFamily:'Fredoka-Bold',
    fontSize:calculateFontSize(12)
  },typeText:{
    fontSize:calculateFontSize(12),
    fontFamily:'Fredoka-Bold',
  }
});

export default Task