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
import { useState, useEffect, useRef } from "react";
import CreateReward from "../components/CreateReward";
import { FlatList } from "react-native-gesture-handler";
import { rewardsOptions } from "../utils/RewardUtils";
import * as Animatable from "react-native-animatable";

const RewardsScreen = () => {
  const { width, height } = Dimensions.get("screen");
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );

  console.log("REWARDS LIST USER",user)

  const [rewardsList,setRewardsList]=useState([])
  const [reward,setReward]=useState('')
  console.log('reward',reward)
  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser);
  const parental = profile ? profile.role === "parent" : true;

  const [show, setShowModal] = useState(false);

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

  useEffect(() => {
    if (reward) {
      setRewardsList((prevList) => [...prevList, reward]);
      console.log('Reward added to list:', reward);
    }
    setReward('')
  }, [reward]); // Runs when `reward` changes


   const renderReward = ({ item }) => {
      const height = 80;
      const width = 80;

      console.log("Rendering item ",item)

      return (
        <TouchableOpacity
          style={styles.rewardAnimation}
        >
          <LottieView
            source={item.content}
            style={{width: width, height: height }}
            autoPlay={true}
            loop={false}
          />
          <Text style={styles.rewardText}>{item.reward}</Text>
          <View style={{flexDirection:'row',alignContent:'center'}}>
           <Animatable.View
                            animation="swing"
                            duration={1500}
                            iterationCount="infinite"
                            style={styles.coinStyle}
                          >
          <Text style={[styles.rewardText,{alignSelf:'center'}]}>$</Text>
          </Animatable.View>
          <Text style={styles.rewardText}>{item.price}</Text>
          </View> 
        </TouchableOpacity>
      );
    };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/backgrounds/pattern_2.png")}
      resizeMode="cover"
    >
      <LottieView
        source={require("../assets/animations/flies.json")}
        style={{ width: width, height: height, position: "absolute" }}
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
            source={require("../assets/animations/rewards/present.json")}
            style={{ width: 70, height: 70 }}
            autoPlay={false}
            loop={false}
            onAnimationFinish={handleAnimationFinish} // Trigger on finish
          />
          <Text style={styles.createText}>Add rewards</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={rewardsList}
        renderItem={renderReward}
        keyExtractor={(item) => String(item.id)}
        numColumns={4} // Three avatars per row
        contentContainerStyle={styles.rewardList}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 2,
              backgroundColor: "#aaa",
              marginHorizontal: 10,
            }}
          />
        )}
      />
      <CreateReward show={show} setShowModal={setShowModal} reward={reward} setReward={setReward}/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
    zIndex: -2,
  },
  button: {
    height: "50%",
    width: "50%",
  },
  createCompetition: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgb(253, 253, 253)", // Adjust the color and transparency
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.93)",
    shadowRadius: 4,
  },
  createText: {
    fontSize: calculateFontSize(20),
    fontFamily: "Fredoka-Medium",
    maxWidth: 90,
    alignContent: "center",
  },rewardList:{
  },rewardText:{
    fontFamily:'Fredoka-Medium',
    alignSelf:'flex-start'

  },rewardAnimation:{
    paddingHorizontal:5,
    paddingVertical:3,
  },coinStyle: {
    backgroundColor: "#F3C623",
    borderRadius: 50,
    padding: 3,
    borderColor: "black",
    borderWidth: 2,
    height:25,
    width:25,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
});

export default RewardsScreen;
