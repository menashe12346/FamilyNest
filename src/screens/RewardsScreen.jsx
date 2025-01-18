import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getProfileById } from "../utils/ProfileUtils";
import LottieView from "lottie-react-native";


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

  return (
    <View>
      <Text>RewardsScreen2</Text>
      <LottieView
        source={require("../assets/animations/reward.json")}
        style={{width: "100%", height: "100%"}}
        autoPlay
        loop
      />
    </View>
  );
};

export default RewardsScreen;
