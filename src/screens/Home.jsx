import React, { useState , useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import NewScreen from "./NewScreen";
import SelectProfileScreen from "./SelectProfileScreen";
import { calculateFontSize } from "../utils/FontUtils";
import avatarImages from "../utils/AvatarsUtils";
import { useDispatch, useSelector } from "react-redux";
import { setReduxProfiles ,addReduxTask } from "../Redux/userSlice";
import { setSelectedProfileId } from "../Redux/selectedProfileSlice";
import { uploadUserData } from "../utils/UploadData";
import { setUser } from "../Redux/userSlice";
import { CreateNewProfile, getNewProfileID , getProfileById ,getProfileAge} from '../utils/ProfileUtils';
import ProfileBar from "../components/ProfileBar";
import CreateTask from "../components/CreateTask";

const Home = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  ); //
  const dispatch = useDispatch();
  console.log("User logged (SelectProfileScreen):", user);

  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false); // To track if the upload is in progress

  const [task,setNewTask] = useState();
  console.log('task',task)

  useEffect(() => {
    const uploadTask = async () => {
      if (task && !loading) {
        try {
          console.log('task to upload', task);
          setLoading(true); // Set loading to true while uploading
          dispatch(addReduxTask(task)); // Dispatch task to Redux
          await uploadUserData(user.uid, user); // Wait for user data upload to complete
          console.log('Task uploaded successfully!');
        } catch (error) {
          console.error('Error uploading task:', error);
        } finally {
          setLoading(false); // Reset loading once the task is uploaded
          setNewTask(null); // Reset the task after the upload
        }
      }
    };

    uploadTask();
  }, [task, dispatch, user, uploadUserData, loading]); // Re-run effect when task or user

  const profile = selectedUser ? getProfileById(user, selectedUser) : null; // Always up-to-date
  const parental = profile ? profile.role === "parent" : true; // Always up-to-date

  return (
    <View style={styles.container}>
      <View style={{width:'90%',height:'10%'}}>
        <ProfileBar profile={profile} />
      </View>
      {showModal && <CreateTask showModal={showModal} setShowModal={setShowModal} user={{user}} profile={{profile}} task={task} setNewTask={setNewTask}/>}
      <Text style={styles.headerText} onPress={()=>setShowModal(true)}>Parents Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    marginTop: "5%",
  },
  headerText: {
    fontSize: calculateFontSize(48),
    fontWeight: "bold",
    color: "#542F2F",
    marginBottom: "10%",
  },
  button: {
    width: "17%",
    height: "8%",
    borderRadius: 800,
    backgroundColor: "#B85455",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: calculateFontSize(30),
    color: "white",
    fontWeight: "bold",
  },
  avatarCircle: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginBottom: "5%",
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 50, // Make it a circle
    overflow: "hidden", // Ensure the image is contained within the circle
  },
  avatarImage: {
    width: "100%", // Adjust the width to fill the circle
    height: "100%", // Adjust the height to fill the circle
    resizeMode: "cover",
  },
});

export default Home;
