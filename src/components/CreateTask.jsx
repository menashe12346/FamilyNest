import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import avatarImages from "../utils/AvatarsUtils";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { setReduxProfiles ,addReduxTask} from "../Redux/userSlice";
import { setSelectedProfileId } from "../Redux/selectedProfileSlice";
import { uploadUserData } from "../utils/UploadData";
import { setUser } from "../Redux/userSlice";
import { calculateFontSize } from "../utils/FontUtils";
import { color } from "@rneui/base";
import DateTimePicker from "./DateTimePicker";
import { useState } from "react";
import ListDropdown from "./ListDropdown";
import { Dropdown } from "react-native-element-dropdown";
import { CreateNewTask, getNewTaskID, taskTypes } from "../utils/TaskUtils";
import ValuePicker from "./ValuePicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getProfileById } from "../utils/ProfileUtils";

const CreateTask = ({ showModal, setShowModal, user, profile ,task,setNewTask }) => {
  profile = profile.profile;
  user = user.user;

  const types = Object.entries(taskTypes).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [valueType, setValueType] = useState(7);
  const [taskTitle,setTaskTitle]=useState('')
  const [description,setDescription]= useState('')
  const [rewardValue,setRewardValue] = useState(10)
  const [assignedProfile,setAssignedProfile] =useState(profile.id)
  const [isFocusType, setIsFocusType] = useState(false);

  const handleValidation = () => {
    if (!taskTitle.trim()) {
      alert("Please enter a task title.");
      return false;
    }
    if (!description.trim()) {
      alert("Please enter a task description.");
      return false;
    }
    if (!date) {
      alert("Please select a date.");
      return false;
    }
    if (!time) {
      alert("Please select a time.");
      return false;
    }
    if (assignedProfile===profile.id){
      alert("Assign to other profile")
      return(false)
    }
    return true;
  };

  const handleAssign =()=>{
      console.log('task:',taskTitle,description,time,date,valueType,rewardValue,assignedProfile)
      const newTask = CreateNewTask({
        creatorID: profile.id,
        assignedTo: assignedProfile,
        taskID: 1,
        title: taskTitle,
        description: description,
        startTime: time,
        endTime: time,
        startDate: new Date(),
        endDate: date,
        type: valueType,
        reward: rewardValue,
        minAge: 0,
      });
      console.log('new Task',newTask)
      setNewTask(newTask)
      setShowModal(false)
  }


  return (
    <Modal visible={showModal} transparent={true} animationType="slide">
      <LinearGradient
        colors={["#e0eafc", "#afdef3"]}
        style={styles.modalContent}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.columnView}>
            <Text style={styles.instText}>Create a task:</Text>
            <TextInput style={styles.taskTitle} placeholder="Title" 
            onChangeText={setTaskTitle}
            value={taskTitle}/>
          </View>

          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <Text style={styles.instText}>Created by</Text>
            <View style={styles.roundedImage}>
              <Image
                source={avatarImages[profile.imageID]}
                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>
        <View style={styles.descriptionView}>
          <TextInput
            style={styles.description}
            placeholder="Task description"
            multiline={true} // Allows the input to be multiline
            numberOfLines={5} // Set the number of lines that should be visible
            maxLength={195} // Limit the number of characters that can be entered
            onChangeText={setDescription} // Handle text input
            value={description} // Bind the text state value
          />
        </View>
        <Text
          style={{
            marginTop: "1%",
            fontFamily: "Fredoka-Bold",
            textAlign: "right",
          }}
        >
          {Math.ceil(description.length / 39)}/5 lines
        </Text>
        <View
          style={{
            marginTop: "1%",
            flexDirection: "row",
            height: "10%",
            width: "70%",
          }}
        >
          <Text
            style={[
              styles.instText,
              { fontFamily: "Fredoka-Bold", textAlign: "right" },
            ]}
          >
            Deadline:{" "}
          </Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <View style={[styles.dateTime, { marginLeft: "7%" }]}>
              <Text style={styles.detailText}>
                {date ? date.toLocaleDateString() : "Select Date"}{" "}
                {/* Format the date */}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <View style={[styles.dateTime, { marginLeft: "20%" }]}>
              <Text style={styles.detailText}>
                {time ? time.toLocaleTimeString() : "Select Time"}{" "}
                {/* Format the time */}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
          <View  style={{
            marginTop: "1%",
            flexDirection: "row",
            height: "10%",
            width: "70%",
            alignItems:'center',
            marginTop:'-5%'
          }}>
          <Text
            style={[
              styles.instText,
              { fontFamily: "Fredoka-Bold", textAlign: "right" },
            ]}
          >
            Type:{" "}
          </Text>
          <View style={styles.taskType}>
          <Dropdown
            data={types}
            labelField={"label"}
            valueField={"value"}
            value={valueType} // Bind selected value to Dropdown
            onFocus={() => setIsFocusType(true)}
            onBlur={() => setIsFocusType(false)}
            placeholder="Select item" // Placeholder text when no value is selected
            onChange={(item) => {
              setValueType(item.value); // Update selected value
              setIsFocusType(false);
            }}
          />
          </View>
          <View style={styles.reward}>
            <Image style={styles.rewardImage}source={require('../assets/images/reward.png')}/>
          </View>
          <ValuePicker value={rewardValue} setValue={setRewardValue}/>
        </View>
        <View style={styles.dropdownList}>
          <ListDropdown
            style={{ height: "53%" }}
            profiles={{ profiles: user.profiles }}
            value={assignedProfile} onChange={setAssignedProfile}
          />
        </View>
        <View
          style={{
            width: "50%",
            height: "12%",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: -160,
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: -5, marginRight: 10 }}
            onPress={() => {
              if(handleValidation()){
                handleAssign()
              }
            }}
          >
            <View style={[styles.button, { backgroundColor: "#8BC34A" }]}>
              <Text style={[styles.instText, { textAlign: "center" }]}>
                Assign
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <View style={[styles.button, { backgroundColor: "#FFCDD2" }]}>
              <Text style={[styles.instText, { textAlign: "center" }]}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          time={time}
          date={date}
          setTime={setTime}
          setDate={setDate}
          show={showPicker}
          setShow={setShowPicker}
        />
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "85%",
    height: "55%",
    paddingStart: "2%",
    paddingEnd: "2%",
    backgroundColor: "#0FFFF0",
    borderRadius: 10,
    alignSelf: "center",
    birderColor: "black",
    borderWidth: 3,
    marginTop: "40%",
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
    fontSize: calculateFontSize(16),
    fontFamily: "Fredoka-Bold",
    backgroundColor: "transparent",
  },
  columnView: {
    width: "75%",
    height: "60%",
  },
  description: {},
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
  }
});

export default CreateTask;
