import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getProfileById } from "../utils/ProfileUtils";
import LottieView from "lottie-react-native";
import ProfileBar from "../components/ProfileBar";
import { calculateFontSize } from "../utils/FontUtils";
import { useState,useEffect,useRef } from "react";
import CreateReward from "../components/CreateReward";


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

  const {width,height} = Dimensions.get('screen')
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );
  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser);
  const parental = profile ? profile.role === "parent" : true;

  const [show,setShowModal]= useState(true)

  const animationRef = useRef(null);

  const handleAnimationFinish = () => {
    // Open the modal once the animation finishes
    setShowModal(true);
  };

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
      <LottieView
       source={require('../assets/animations/flies.json')}
       style={{ width: width, height: height, position:'absolute' }}
       autoPlay={true}
       loop={true}
      />
      <View style={{ marginTop: "5%", width: "90%", height: "10%" }}>
        <ProfileBar profile={profile} />
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.createCompetition}>
          <LottieView
            ref={animationRef}
            source={require('../assets/animations/rewards/present.json')}
            style={{ width: 70, height: 70 }}
            autoPlay={false}
            loop={false}
            onAnimationFinish={handleAnimationFinish} // Trigger on finish
          />
          <Text style={styles.createText}>Add rewards</Text>
        </View>
      </TouchableOpacity>
      <CreateReward show={show} setShowModal={setShowModal} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
    zIndex:-2
  },
  button: {
    height: "50%",
    width: "50%",
  },
  createCompetition: {
    marginTop:10,
    paddingHorizontal:10,
    backgroundColor: "rgb(253, 253, 253)", // Adjust the color and transparency
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    elevation:10,
    shadowColor:"rgba(0, 0, 0, 0.93)",
    shadowRadius:4
  },createText:{
    fontSize:calculateFontSize(20),
    fontFamily:'Fredoka-Medium',
    maxWidth:90,
    alignContent:'center'
  }
});

export default RewardsScreen;
