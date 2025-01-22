import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { calculateFontSize } from "../utils/FontUtils";
import avatarImages from "../utils/AvatarsUtils";
import { isMomDadSonDaughter, getProfileAge } from "../utils/ProfileUtils";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../utils/ProfileUtils";
import { fetchUserData } from "../utils/FetchData";

const ProfileBar = ({ profile, style, onPress, points }) => {
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );
  const dispatch = useDispatch();

  let updated_profile = getProfileById(user, selectedUser);

  const today = new Date();
  // Format the date to YYYY-MM-DD
  const formattedToday = today.toISOString().slice(0, 10);

  const onStreak =
    updated_profile.latest_daily_login === formattedToday ? true : false;

  useEffect(() => {
    // Function to execute every minute
    const interval = setInterval(() => {
      fetchUserData(user.uid, dispatch);
      updated_profile = getProfileById(user, selectedUser);
    }, 30000); // 0.5 minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [updated_profile]); // Empty dependency array to run only once

  const colors =
    profile.gender === "male"
      ? ["#81BFDA", "#87CEFA", "#B1F0F7"]
      : ["#FB9EC6", "#FFB6C1", "#FFE2E2"];

  const profileImage = profile.imageID
    ? avatarImages[profile.imageID]
    : { uri: profile.avatarURI };

  return (
    <Pressable
      style={[
        styles.pressable,
        style,
        { borderColor: profile.gender === "male" ? "#81BFDA" : "#FB9EC6" },
      ]}
      onLongPress={() => console.warn("ProfileBar pressed")}
      onPress={onPress}
    >
      <LinearGradient
        colors={colors}
        style={styles.linearStyle}
        start={{ x: 0.5, y: 0.5 }} // Start at top-left
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.roundImage}>
          <Image source={profileImage} style={styles.avatarImage} />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.nameStyle}>
            {profile.name}, {getProfileAge(profile.birth_day)}
          </Text>
          <Text style={styles.roleText}>
            {isMomDadSonDaughter({ profile })}
          </Text>
        </View>
        {/* <View style={[styles.profileDetails,{marginStart:'2%'}]}>
        <FontAwesome name={"birthday-cake"} size={calculateFontSize(20)} color={'black'}>
        </FontAwesome>
      </View> */}
        <Text style={styles.nameStyle}></Text>
        {profile.role === "child" && (
          <View
            style={{
              marginStart: "20%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View>
              <View style={styles.rewardView}>
                <LottieView
                  source={require("../assets/animations/coins.json")}
                  style={{ width: 45, height: 45, alignSelf: "center" }}
                  autoPlay={true}
                  loop={true}
                  speed={0.5}
                />
                {profile.role === "child" && (
                  <Text style={styles.roleText}>{updated_profile.points}</Text>
                )}
              </View>
              <View style={styles.streakView}>
                <LottieView
                  source={
                    onStreak
                      ? require("../assets/animations/on-streak.json")
                      : require("../assets/animations/on-cold.json")
                  }
                  style={{ width: 45, height: 45, alignSelf: "center" }}
                  autoPlay={true}
                  loop={true}
                  speed={0.5}
                />
                {profile.role === "child" && (
                  <Text
                    style={[
                      styles.roleText,
                      {
                        top: 8,
                        fontSize: onStreak
                          ? calculateFontSize(18)
                          : calculateFontSize(9),
                      },
                    ]}
                  >
                    {onStreak
                      ? updated_profile.streak
                      : "Daily login available"}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    borderWidth: 4,
  },
  nameStyle: {
    fontSize: calculateFontSize(24),
    fontFamily: "Fredoka-SemiBold",
  },
  roundImage: {
    marginStart: "2%",
    //backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
    width: 60, // Increased width
    height: 60, // Increased height
    borderRadius: 30, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },
  avatarImage: {
    width: "100%", // Adjust the width to fill the circle
    height: "100%", // Adjust the height to fill the circle
    resizeMode: "cover",
  },
  profileDetails: {
    flexDirection: "column",
    marginStart: "1%",
    backgroundColor: "transparent",
  },
  roleText: {
    fontSize: calculateFontSize(18),
    fontFamily: "Fredoka-Regular",
    backgroundColor: "transparent",
  },
  linearStyle: {
    width: 375,
    height: 90,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
  },
  rewardView: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    width: 50,
    position: "absolute",
    top: -72,
    left: 15,
  },
  streakView: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    width: 50,
    position: "absolute",
    top: -35,
    left: 15,
  },
  rewardImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});

export default ProfileBar;
