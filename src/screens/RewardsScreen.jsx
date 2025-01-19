import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getProfileById } from "../utils/ProfileUtils";
import LottieView from "lottie-react-native";
import ProfileBar from "../components/ProfileBar";
import { calculateFontSize } from "../utils/FontUtils";
import { useState,useEffect,useRef } from "react";


/**
 * TODO
 *
 * 1.let parents set and active rewards and time period (can use our component DateTimePicker)
 * 2.show some leadboard chart for active rewards competition for example https://docs.appspace.com/wp-content/uploads/2020/10/Leaderboard-1024x575.png
 * 3.option to look on previous competitions
 *
 * competition:{
 * [
 * startTime: date
 * endTime: date
 * rewards:[...]  (optional rank 1 rank 2 rank 3)
 * groupReward  (optional)
 * participants:[{profileID, score}...]
 *
 * ***** basic things ******
 * ***** open to changes *****
 * ]}
 *
 *  * may be only 1
 * rewards:[{rank1,prize},....{rank2,prize}....]
 *
 *
 * available components from:   react-native-chart-kit, react-native-svg-charts
 * (look for bar chart horizontal)
 *
 */

const RewardsScreen = () => {
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );
  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser);
  const parental = profile ? profile.role === "parent" : true;


  const animationRef = useRef(null);

  // Play animation when the screen is loaded
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const handlePress = () => {
    if (animationRef.current) {
      animationRef.current.play(); // Play the animation on press
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/backgrounds/pattern_2.png")}
      resizeMode="cover"
    >
      <View style={{ marginTop: "5%", width: "90%", height: "10%" }}>
        <ProfileBar profile={profile} />
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.createCompetition}>
          <LottieView
            ref={animationRef}
            source={require('../assets/animations/competition.json')}
            style={{ width: 70, height: 70 }}
            autoPlay={false}
            loop={false}
          />
          <Text style={styles.createText}>Add targets and rewards</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
  },
  button: {
    height: "50%",
    width: "50%",
  },
  createCompetition: {
    marginTop:10,
    padding:2,
    backgroundColor: "rgba(253, 253, 253, 0.93)", // Adjust the color and transparency
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    elevation:10,
    shadowColor:"rgba(0, 0, 0, 0.93)",
    shadowRadius:4
  },createText:{
    fontSize:calculateFontSize(20),
    fontFamily:'Fredoka-Bold'
  }
});

export default RewardsScreen;
