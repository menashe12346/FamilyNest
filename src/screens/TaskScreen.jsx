import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Image
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReduxProfiles, addReduxTask } from "../Redux/userSlice";
import { getProfileAge, getProfileById } from "../utils/ProfileUtils";
import ProfileBar from "../components/ProfileBar";
import { getBackgroundImage, getTaskById } from "../utils/TaskUtils";
import avatarImages from "../utils/AvatarsUtils";
import { calculateFontSize } from "../utils/FontUtils";

const TaskScreen = ({ navigator, route }) => {
  console.log(route);

  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  ); //

  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser); // Always up-to-date
  const parental = profile ? profile.role === "parent" : true; // Always up-to-date
  const [task, setTask] = useState(
    getTaskById(user.tasks, route.params.taskID)
  );
  const [assignedProfile,setAssignedProfile]=useState(getProfileById(null,task.assignedTo))
  console.log("TASK SCREEN=", assignedProfile);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        source={getBackgroundImage({ type: task.type })}
        style={{ height: "100%", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={{ marginTop: "2%", width: "100%", height: "10%" }}>
            <ProfileBar profile={profile} />
          </View>
          <View style={[styles.detailContainer,{alignItems:'center',marginTop:'3%',flexDirection:'row'}]}>
          <Text style={styles.detailText}>Assigned to:</Text>
            <View style={styles.roundedImage}>
              <Image style={{resizeMode:'cover',height:60,width:60}}source={avatarImages[assignedProfile.imageID]}/>
            </View>
            <Text style={styles.detailText}>{assignedProfile.name},{getProfileAge(assignedProfile.birth_day)}</Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(248, 248, 248, 0.7)", // Adjust the color and transparency
    padding: "2%",
  },roundedImage:{
    marginStart:5,
    justifyContent:'center',
    borderWidth: 2,
    width: 60, // Increased width
    height: 60, // Increased height
    borderRadius: 50, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },detailText:{
    fontSize:calculateFontSize(30),
    fontFamily:'Fredoka-Bold'
  },detailContainer:{
    // backgroundColor:'white',
    // elevation:5,
    // borderRadius:15,
    // paddingVertical:10,
    // paddingHorizontal:5,
  }
});

export default TaskScreen;
