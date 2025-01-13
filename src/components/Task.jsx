import { View, Text , StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { calculateFontSize } from '../utils/FontUtils'
import CountdownTimer from './CountdownTimer';
import { getSecondsRemaining } from '../utils/TimeUtils';
import { getProfileById } from '../utils/ProfileUtils';
import { taskTypes } from '../utils/TaskUtils';
import ProfileBar from './ProfileBar';
import avatarImages from '../utils/AvatarsUtils';

const backgroundImages = {
  2: require('../assets/images/cleaning.jpg'),
  1: require('../assets/images/outdoor.jpg'),
  3: require('../assets/images/laundry-pattern.jpg'),
  4: require('../assets/images/pet-pattern.jpg'),
  5: require('../assets/images/study.jpg'),
  6: require('../assets/images/dish-wash.jpg')
}

const Task = ({task}) => {
  task=task.item
  const assignedTo = getProfileById(null,task.assignedTo)
  description=task.description.length>30? task.description.slice(0,30)+'....' : task.description
  console.log('my task1',task)

  const [profile,setProfile]= useState(getProfileById(null,task.assignedTo))
  const [remaining,setRemaining]=useState(true)

// Determine the background image based on the task type
const getBackgroundImage = () => {
  switch (task.type) {
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

  return (
    <ImageBackground
      source={getBackgroundImage()}
      resizeMode="cover"
      style={[styles.modalContent,{height:remaining?130:130,borderColor:remaining?'green':'red'}]}>
      <View style={styles.overlay}>
      <View style={{alignItems:'center',alignContent:'center',flexDirection:'row'}}>
        <View style={styles.roundedImage}>
          <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={avatarImages[profile.imageID]}/>
        </View>
        <Text style={styles.nameText}>{assignedTo.name}</Text>
        <CountdownTimer remaining={remaining} setRemaining={setRemaining} initialSeconds={getSecondsRemaining(task.endTime)}/>
      </View>
      <View style={styles.container}>
        <View style={{alignContent:'center',flexDirection:'row'}}>
          <Text style={styles.instText}>{task.title}</Text>
        </View>
        <Text style={styles.typeText}>Type: {taskTypes[task.type]}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    width: 180,
    height:130,
    paddingStart: "2%",
    paddingEnd: "2%",
    borderRadius: 10,
    elevation:5,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 3,
    marginTop: "1%",
    flexDirection: "column",
    overflow:'hidden'
  },
  taskTitle: {
    backgroundColor: "white",
    marginTop: "2%",
    borderRadius: 10,
    elevation: 10,
  },
  roundedImage: {
    borderWidth: 2,
    width: 30, // Increased width
    height: 30, // Increased height
    borderRadius: 20, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },
  instText: {
    fontSize: calculateFontSize(20),
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
    fontSize:calculateFontSize(16),
  },typeText:{
    fontSize:calculateFontSize(16),
    fontFamily:'Fredoka-Bold',
  },overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: 'rgba(255, 255, 255, 0.36)', // Adjust the color and transparency
    padding:'2%'
  }
});

export default Task