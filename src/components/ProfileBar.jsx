import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { calculateFontSize } from "../utils/FontUtils";
import avatarImages from "../utils/AvatarsUtils";
import { isMomDadSonDaughter, getProfileAge } from "../utils/ProfileUtils";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const ProfileBar = ({ profile, style, onPress }) => {
  console.log("Profile (HOME):", profile);
  const colors =
    profile.gender === "male" ? ["#1E90FF", "#87CEFA"] : ["#FF69B4", "#FFB6C1"];
  return (
    <Pressable
      style={[
        styles.pressable,
        style,
        { borderColor: profile.gender === "male" ? "#1E90FF" : "#FF69B4" },
      ]}
      onLongPress={() => console.warn("ProfileBar pressed")}
      onPress={onPress}
    >
      <LinearGradient colors={colors} style={styles.linearStyle}>
        <View style={styles.roundImage}>
          <Image
            source={avatarImages[profile.imageID]}
            style={styles.avatarImage}
          />
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
        {profile.role==='child' && <View
          style={{
            marginStart: "20%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={styles.rewardView}>
            <Image
              style={styles.rewardImage}
              source={require("../assets/images/reward.png")}
            />
          </View>
          <Text style={styles.roleText}>{profile.reward}</Text>
        </View>}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    borderWidth: 4,
  },
  nameStyle: {
    fontSize: calculateFontSize(24),
    fontFamily: "Fredoka-Bold",
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
    fontFamily: "Fredoka-Bold",
    backgroundColor: "transparent",
  },
  linearStyle: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
  },
  rewardView: {
    height: 40,
    width: 40,
  },
  rewardImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});

export default ProfileBar;
