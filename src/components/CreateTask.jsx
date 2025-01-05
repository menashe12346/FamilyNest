import { Modal, View, Text, TextInput, StyleSheet, Image , TouchableOpacity } from "react-native";
import React from "react";
import avatarImages from "../utils/AvatarsUtils";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { setReduxProfiles } from "../Redux/userSlice";
import { setSelectedProfileId } from "../Redux/selectedProfileSlice";
import { uploadUserData } from "../utils/UploadData";
import { setUser } from "../Redux/userSlice";
import { calculateFontSize } from "../utils/FontUtils";
import { color } from "@rneui/base";
import DateTimePicker from "./DateTimePicker";
import { useState } from "react";

const CreateTask = ({ showModal, setShowModal, user, profile}) => {
    const [text, setText] = React.useState(''); // Initialize the text state
  profile = profile.profile;

   const [showPicker, setShowPicker] = useState(true);
   const [date ,setDate] =useState(new Date())
   const [time ,setTime] =useState(new Date())

  return (
    <Modal visible={showModal} transparent={true} animationType="slide">
      <LinearGradient
        colors={["#e0eafc", "#afdef3"]}
        style={styles.modalContent}
      >
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={styles.columnView}>
            <Text style={styles.instText}>Create a task:</Text>
            <TextInput style={styles.taskTitle} placeholder="Title" />
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
            <TextInput style={styles.description} placeholder="Task description" 
            multiline={true}   // Allows the input to be multiline
            numberOfLines={5}  // Set the number of lines that should be visible
            maxLength={195}    // Limit the number of characters that can be entered
            onChangeText={(inputText) => setText(inputText)} // Handle text input
            value={text}  // Bind the text state value
            />
         </View>
         <Text style={{marginTop:"1%",fontFamily:'Fredoka-Bold',textAlign:'right'}}>{Math.ceil(text.length/39)}/5 lines</Text>
         <View style={{flexDirection:'row',height:'12%', width:'70%'}}>
            <TouchableOpacity>
              <View style={styles.dateTime}>
                <Text>
                {date ? date.toLocaleDateString() : "Select Date"} {/* Format the date */}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.dateTime,{marginLeft:10}]}>
                <Text>
                {time ? time.toLocaleTimeString() : "Select Time"} {/* Format the time */}
                </Text>
              </View>
            </TouchableOpacity>
         </View>
         <View style={{width:"50%",height:'12%',flexDirection: "row",alignSelf:'center',marginTop:"2%",}}>
            <TouchableOpacity style={{marginLeft:-5,marginRight: 10}}
            onPress={() => {setShowModal(false);}}>
                <View style={[styles.button,{backgroundColor: "#8BC34A"}]}>
                    <Text style={[styles.instText,{textAlign:'center'}]}>Assign</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowModal(false)}>
                <View style={[styles.button,{backgroundColor: "#FFCDD2"}]}>
                    <Text style={[styles.instText,{textAlign:'center'}]}>Cancel</Text>
                </View>
            </TouchableOpacity>
         </View>
         <DateTimePicker time={time} date={date} setTime={setTime} setDate={setDate} show={showPicker} setShow={setShowPicker}/>
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
  },columnView:{
    width: "75%",
    height: "60%",
  },description:{
  },descriptionView:{
    backgroundColor: "white",
    marginTop: "2%",
    height: "22%",
    width: "100%",
    borderRadius: 10,
    elevation: 10,
  },button:{
    color: "white",
    borderRadius: 7,
    height: 30,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
  },dateTime:{
    backgroundColor:'white',
    elevation:10,
    borderRadius:10,
    height:'50%',
    justifyContent:'space-around',
  }
});

export default CreateTask;
