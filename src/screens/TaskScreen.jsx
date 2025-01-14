import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReduxProfiles, addReduxTask } from "../Redux/userSlice";
import { getProfileById } from "../utils/ProfileUtils";
import ProfileBar from "../components/ProfileBar";
import { getBackgroundImage, getTaskById } from "../utils/TaskUtils";

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
  console.log("TASK SCREEN=", task);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ marginTop: "5%", width: "90%", height: "10%" }}>
        <ProfileBar profile={profile} />
      </View>
      <View style={styles.taskContainer}>
        <ImageBackground
          source={getBackgroundImage({ type: task.type })}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text>{}</Text>
          </View>
        </ImageBackground>
      </View>
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
  taskContainer: {
    marginTop: "8%",
    width: "90%", // Ensures full width
    height: "60%", // Ensures full height
    borderWidth: 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(248, 248, 248, 0.7)", // Adjust the color and transparency
    padding: "2%",
  },
});

export default TaskScreen;
