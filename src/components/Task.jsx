import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { calculateFontSize } from "../utils/FontUtils";
import CountdownTimer from "./CountdownTimer";
import { getSecondsRemaining } from "../utils/TimeUtils";
import { getProfileById } from "../utils/ProfileUtils";
import { taskTypes, getBackgroundImage } from "../utils/TaskUtils";
import ProfileBar from "./ProfileBar";
import avatarImages from "../utils/AvatarsUtils";
import * as Animatable from "react-native-animatable";
import { Badge } from "react-native-elements";
import { updateTaskStatus } from "../utils/TaskUtils";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";

const isNewTask = (startTime, thresholdHours = 3) => {
  const currentTime = new Date(); // Get the current time
  const taskStartTime = new Date(startTime); // Convert startTime string to a Date object
  const timeDifference = (currentTime - taskStartTime) / (1000 * 60 * 60); // Difference in hours
  return timeDifference <= thresholdHours; // Task is new if within the threshold
};

const Task = ({ task }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  task = task.item;
  const assignedTo = getProfileById(null, task.assignedTo);
  description =
    task.description.length > 30
      ? task.description.slice(0, 30) + "...."
      : task.description;

  const [profile, setProfile] = useState(getProfileById(null, task.assignedTo));
  const [remaining, setRemaining] = useState(true);
  const [isNew, setIsNew] = useState(isNewTask(task.startTime, 3));

  const profileImage = profile.imageID
    ? avatarImages[profile.imageID]
    : { uri: profile.avatarURI };

  useEffect(() => {
    const currentTime = new Date();
    const taskEndTime = new Date(task.endTime);

    if (taskEndTime > currentTime && task.status === "EXPIRED") {
      handleStatus("ACTIVE");
    } else if (taskEndTime < currentTime && task.status === "ACTIVE") {
      handleStatus("EXPIRED");
    }
  }, [task]);

  const handleStatus = async (taskStatus) => {
    console.log("Changing status...", taskStatus);
    updateTaskStatus({ user, task, status: taskStatus, dispatch });
  };

  return (
    <ImageBackground
      source={getBackgroundImage({ type: task.type })}
      resizeMode="cover"
      style={[
        styles.modalBackground,
        {
          height: remaining ? 130 : 130,
          borderColor:
            remaining || task.status === "COMPLETED"
              ? task.status === "COMPLETED"
                ? "#4635B1"
                : "#5DB996"
              : "#EB5A3C",
        },
      ]}
    >
      <View style={styles.overlay}>
        {isNew && task.status === "NEW_TASK" && (
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              position: "absolute",
              top: 100,
              right: 0,
              height: 40,
              width: 80,
            }}
          >
            <Badge
              badgeStyle={{
                backgroundColor: "#98D8EF",
                height: 30,
                minWidth: 30, // Ensure enough space for text
                paddingHorizontal: 10, // Add padding for text
                borderRadius: 15, // Ensure rounded corners
              }}
              status="primary"
              value={"NEW TASK!"}
              textStyle={{
                fontSize: 12,
                fontFamily: "Fredoka-SemiBold",
                color: "#000000",
              }}
              containerStyle={{ marginVertical: -10 }}
            />
          </Animatable.View>
        )}
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={styles.roundedImage}>
            <Image
              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
              source={profileImage}
            />
          </View>
          <Text style={styles.nameText}> {assignedTo.name} </Text>
          {task.status !== "COMPLETED" && (
            <CountdownTimer
              remaining={remaining}
              setRemaining={setRemaining}
              initialSeconds={getSecondsRemaining(task.endTime)}
            />
          )}
          {task.status === "COMPLETED" && (
            <Badge
              status="primary"
              value={"Completed"}
              badgeStyle={{
                backgroundColor:'#4CC9FE',
                height: 30,
                minWidth: 30, // Ensure enough space for text
                paddingHorizontal: 2, // Add padding for text
                borderRadius: 15, // Ensure rounded corners
              }}
              textStyle={{
                fontSize: calculateFontSize(12),
                fontFamily: "Fredoka-Regular",
                color: "black",
                textAlign: "center",
              }}
            />
          )}
        </View>
        <View style={styles.container}>
          <View style={{ alignContent: "center", flexDirection: "row" }}>
            <Text style={styles.lightText}>{task.title}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.detailText}>Type: </Text>
            <Text style={styles.lightText}>{taskTypes[task.type]}</Text>
          </View>
          <Text style={styles.lightText}>{description}</Text>
        </View>
      </View>
      {task.status === "WAITING_COMPLETE" && (
        <View
          style={{
            backgroundColor: "rgba(67, 192, 78, 0.73)", // Adjust the color and transparency
            padding: 4,
            position: "absolute",
            bottom: 3,
            right: 3,
            flexDirection: "row",
            borderRadius: 10,
            elevation: 10,
            justifyContent: "center",
          }}
        >
          <Animatable.Text
            style={[styles.detailText, { fontSize: 10, color: "#333333" }]}
            animation="pulse"
            iterationCount="infinite" // Set to infinite to keep pulsing
            duration={1000} // Adjust the speed of the pulse
          >
            Pending {"\n"}verification
          </Animatable.Text>
          <LottieView
            source={require("../assets/animations/notification.json")}
            autoPlay={true}
            loop={true}
            style={{ height: 20, width: 20 }}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: 180,
    height: 130,
    paddingStart: "2%",
    paddingEnd: "2%",
    alignSelf: "center",
    marginTop: "1%",
    flexDirection: "column",
    borderColor: "grey",
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 10,
    elevation: 5,
  },
  taskTitle: {
    backgroundColor: "white",
    marginTop: "2%",
    borderRadius: 10,
    elevation: 10,
  },
  roundedImage: {
    borderWidth: 2,
    width: 30, // Increased width
    height: 30, // Increased height
    borderRadius: 20, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },
  instText: {
    fontSize: calculateFontSize(20),
    fontFamily: "Fredoka-Bold",
    backgroundColor: "transparent",
  },
  columnView: {
    width: "75%",
    height: "60%",
  },
  description: {
    fontFamily: "Fredoka-Bold",
  },
  descriptionView: {
    backgroundColor: "white",
    marginTop: "2%",
    height: "22%",
    width: "100%",
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    color: "white",
    borderRadius: 7,
    height: 30,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  dateTime: {
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    height: "50%",
    width: "115%",
    justifyContent: "space-around",
  },
  detailText: {
    fontFamily: "Fredoka-SemiBold",
    textAlign: "center",
    fontSize: calculateFontSize(12),
  },
  lightText: {
    fontFamily: "Fredoka-Regular",
    fontSize: calculateFontSize(12),
  },
  dropdownList: {
    alignItems: "center",
  },
  taskType: {
    width: "60%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 8,
    justifyContent: "center",
    marginStart: "1%",
  },
  reward: {
    marginHorizontal: 5,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardImage: {
    resizeMode: "cover",
    height: 40,
    width: 40,
  },
  container: {
    flexDirection: "column",
  },
  nameText: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: calculateFontSize(16),
  },
  typeText: {
    fontSize: calculateFontSize(16),
    fontFamily: "Fredoka-Bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the color and transparency
    padding: "2%",
  },
});

export default Task;
