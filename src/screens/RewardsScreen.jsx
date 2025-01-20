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
import CreateTargets from "../components/CreateTargets";
import * as Animatable from "react-native-animatable";

const RewardsScreen = () => {
  const { width, height } = Dimensions.get("screen");
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );

  console.log("REWARDS LIST USER", user);

  const [rewardsList, setRewardsList] = useState([]);
  const [reward, setReward] = useState("");
  const [target, setTarget] = useState("")



  console.log("reward", reward);
  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser);
  const parental = profile ? profile.role === "parent" : true;

  const [show, setShowModal] = useState(false);
  const [showTargets, setShowTargets] = useState(false);

  const animationRewardRef = useRef(null);
  const animationTargetRef = useRef(null);

  const handleRewardAnimationFinish = () => {
    // Open the modal once the animation finishes
    setShowModal(true);
  };
  const handleTargetAnimationFinish = () => {
    // Open the modal once the animation finishes
    setShowTargets(true);
  };

  const handlePressAddRewards = () => {
    if (animationRewardRef.current) {
      animationRewardRef.current.play(); // Play the animation on press
    }
  };

  const handlePressSetTargets = () => {
    if (animationTargetRef.current) {
      animationTargetRef.current.play(); // Play the animation on press
    }
  };

  useEffect(() => {
    if (reward) {
      setRewardsList((prevList) => [...prevList, reward]);
      console.log("Reward added to list:", reward);
    }
    setReward("");
  }, [reward]); // Runs when `reward` changes

  const renderReward = ({ item }) => {
    const height = 80;
    const width = 80;

    console.log("Rendering item ", item);

    return (
      <TouchableOpacity style={styles.rewardAnimation}>
        <LottieView
          source={item.content}
          style={{ width: width, height: height }}
          autoPlay={true}
          loop={false}
        />
        <Text style={styles.rewardText}>{item.reward}</Text>
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Animatable.View
            animation="swing"
            duration={1500}
            iterationCount="infinite"
            style={styles.coinStyle}
          >
            <Text style={[styles.rewardText, { alignSelf: "center" }]}>$</Text>
          </Animatable.View>
          <Text style={styles.rewardText}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={styles.container}
      // source={require("../assets/backgrounds/pattern_2.png")}
      // resizeMode="cover"
    >
      <LottieView
        source={require("../assets/animations/background-shapes.json")}
        style={{ top:-175,width: width, height: height, position: "absolute" }}
        autoPlay={true}
        loop={false}
        speed={0.35}
      />
      <View style={{ marginTop: "5%", width: "90%", height: "10%" }}>
        <ProfileBar profile={profile} />
      </View>
      <View style={{height:15}}/>
      {parental && (
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={handlePressAddRewards}>
          <View style={styles.createCompetition}>
            <LottieView
              ref={animationRewardRef}
              source={require("../assets/animations/rewards/present.json")}
              style={{ width: 70, height: 70 }}
              autoPlay={false}
              loop={false}
              onAnimationFinish={handleRewardAnimationFinish} // Trigger on finish
            />
            <Text style={styles.createText}>Add rewards</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressSetTargets}>
          <View style={styles.createCompetition}>
            <LottieView
              ref={animationTargetRef}
              source={require("../assets/animations/target.json")}
              style={{ width: 70, height: 70 }}
              autoPlay={false}
              loop={false}
              speed={0.7}
              onAnimationFinish={handleTargetAnimationFinish} // Trigger on finish
            />
            <Text style={styles.createText}>Set targets</Text>
          </View>
        </TouchableOpacity>
        </View>
      )}
      <View style={{height:10}}/>
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
      <CreateReward
        show={show}
        setShowModal={setShowModal}
        reward={reward}
        setReward={setReward}
      />
      <CreateTargets
        show={showTargets}
        setShowModal={setShowTargets}
        target={target}
        setTarget={setTarget}
      />
    </View>
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
    marginLeft:10
  },
  createText: {
    fontSize: calculateFontSize(20),
    fontFamily: "Fredoka-Medium",
    maxWidth: 90,
    alignContent: "center",
  },
  rewardList: {},
  rewardText: {
    fontFamily: "Fredoka-Medium",
    alignSelf: "flex-start",
  },
  rewardAnimation: {
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  coinStyle: {
    backgroundColor: "#F3C623",
    borderRadius: 50,
    padding: 3,
    borderColor: "black",
    borderWidth: 2,
    height: 25,
    width: 25,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RewardsScreen;
