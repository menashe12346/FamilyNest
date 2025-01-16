import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getProfileById } from "../utils/ProfileUtils";

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
      <Text>RewardsScreen</Text>
    </View>
  );
};

export default RewardsScreen;
