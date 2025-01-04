import React, { useState } from "react";
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
import { setReduxProfiles } from "../Redux/userSlice";
import { setSelectedProfileId } from "../Redux/selectedProfileSlice";
import { uploadUserData } from "../utils/UploadData";
import { setUser } from "../Redux/userSlice";
import { CreateNewProfile, getNewProfileID , getProfileById ,getProfileAge} from '../utils/ProfileUtils';
import ProfileBar from "../components/ProfileBar";

const Home = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  ); //
  const dispatch = useDispatch();
  console.log("User logged (SelectProfileScreen):", user);

  const [parental, setParental] = useState(
    selectedUser ? getProfileById(user, selectedUser).role === "parent" : true
  );
  const [profile,setProfile] = useState(getProfileById(user,selectedUser))
  console.log("Profile",profile)
  console.log("Parental:", parental);

  return (
    <View style={styles.container}>
      <ProfileBar profile={profile} />
      <Text style={styles.headerText}>Parents Screen</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() =>
          navigation.navigate("NewScreen", {
            items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
          })
        }
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
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
