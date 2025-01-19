import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TextInput, // Add this line to fix the issue
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReduxTask,
  setReduxProfiles,
  addReduxTask,
} from "../Redux/userSlice";
import { getProfileAge, getProfileById } from "../utils/ProfileUtils";
import ProfileBar from "../components/ProfileBar";
import {
  getBackgroundImage,
  getTaskAnimations,
  getTaskById,
  taskTypes,
  updateTaskStatus,
} from "../utils/TaskUtils";
import avatarImages from "../utils/AvatarsUtils";
import { calculateFontSize } from "../utils/FontUtils";
import CountdownTimer from "../components/CountdownTimer";
import { getSecondsRemaining } from "../utils/TimeUtils";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../../firebase";
import { Badge } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { generateColor } from "../utils/ChatColors";
import { uploadUserData } from "../utils/UploadData";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";

const TaskScreen = ({ navigation, route }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [task, setTask] = useState(
    getTaskById(user.tasks, route.params.taskID)
  );

  const [assignedProfile, setAssignedProfile] = useState(
    getProfileById(null, task.assignedTo)
  );

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const [chat, setChat] = useState(task.chat); // רשימת הודעות
  const [newMessage, setNewMessage] = useState(""); // הודעה חדשה

  const animationRef = useRef(null);

  const profileImage = assignedProfile.imageID
    ? avatarImages[assignedProfile.imageID]
    : { uri: assignedProfile.avatarURI };

  const handleSendMessage = async () => {
    console.log("Sending message...");
    console.log("New message before trimming:", newMessage);

    if (newMessage.trim() !== "") {
      console.log("Message is valid:", newMessage);
      console.log("chat length:", chat.length);
      console.log("profile ID:", profile.id);
      console.log("newMessage:", newMessage);

      const newMessageObj = {
        id: chat.length + 1,
        profileId: profile.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      console.info("after new obj");

      // Update local state
      const updatedChat = [...chat, newMessageObj];
      setChat(updatedChat);
      console.log("Updated chat:", updatedChat);

      const updatedTask = {
        ...task,
        chat: updatedChat,
      };

      try {
        const userDocRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        const doc = await userDocRef.get();
        console.log("User document exists:", doc.exists);

        if (doc.exists) {
          const data = doc.data();
          console.log("Document data:", data);

          const tasks = data.tasks;
          const taskIndex = tasks.findIndex((t) => t.id === task.id);

          if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;

            // Update Firestore
            await userDocRef.update({ tasks });
            console.log("Task updated successfully in Firestore");

            // Update Redux state
            dispatch(updateReduxTask(updatedTask));
            setTask(updatedTask);
            console.log("Task updated in Redux.");
          } else {
            console.error("Task not found in Firestore.");
          }
        } else {
          console.error("User document not found.");
        }
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Error updating task. Please try again.");
      }

      // Reset the input field
      setNewMessage("");
    } else {
      console.log("Message is empty or only whitespace.");
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleExtendTime = async () => {
    console.log("Extend time clicked");

    // Define the additional time to add (1 hour in milliseconds)
    const additionalTime = 3600 * 1000; // 1 hour

    // Parse the current `endTime` from ISO format to a Date object
    let currentEndTime = new Date(task.endTime);

    const now = new Date();

    // Check if the current end time has expired
    if (currentEndTime < now) {
      // If expired, set it to the current date and time
      currentEndTime = now;
    }

    // Add the additional time
    const updatedEndTime = new Date(currentEndTime.getTime() + additionalTime);

    console.log("New time", updatedEndTime);

    // Convert back to ISO string format
    const updatedTask = {
      ...task,
      endTime: updatedEndTime.toISOString(),
    };

    try {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);

      // קבלת המסמך הנוכחי
      const doc = await userDocRef.get();
      if (doc.exists) {
        const data = doc.data();
        const tasks = data.tasks;

        // עדכון המשימה המתאימה
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = updatedTask;

          // עדכון המערך במסמך
          userDocRef.update({ tasks });

          // עדכון Redux
          dispatch(updateReduxTask(updatedTask));
          setTask(updatedTask);

          console.log("Task updated successfully in Firestore and Redux.");
        } else {
          console.error("Task not found in Firestore.");
        }
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }

    closeMenu();
  };

  const handleTransferProfile = () => {
    console.log("Transfer profile clicked");

    // רשימת פרופילים שאינם משויכים כרגע למטלה
    const availableProfiles = user.profiles.filter(
      (profile) => profile.id !== task.assignedTo
    );

    if (availableProfiles.length === 0) {
      console.log("No available profiles to transfer to.");
      return closeMenu();
    }

    // לדוגמה: לבחור את הפרופיל הראשון מהרשימה
    const newAssignedProfile = availableProfiles[0];

    // יצירת אובייקט המטלה המעודכן
    const updatedTask = {
      ...task,
      assignedTo: newAssignedProfile.id, // פרופיל חדש
    };

    // Dispatch לעדכון ב-Redux
    dispatch(updateReduxTask(updatedTask));

    console.log("Task transferred to profile:", newAssignedProfile);

    // סגירת התפריט
    closeMenu();
  };

  const handleEditTask = () => {
    console.log("Edit task clicked");
    closeMenu();
  };

  const handleDeleteTask = async () => {
    console.log("Delete task clicked");

    try {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);

      // שליפת מסמך המשתמש
      const doc = await userDocRef.get();
      if (doc.exists) {
        const data = doc.data();
        const tasks = data.tasks;

        // מציאת המשימה למחיקה
        const updatedTasks = tasks.filter((t) => t.id !== task.id);

        // עדכון Firestore עם המערך החדש
        await userDocRef.update({ tasks: updatedTasks });

        // עדכון Redux
        dispatch(updateReduxTask({ ...user, tasks: updatedTasks }));

        console.log("Task deleted successfully.");
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    // סגירת התפריט
    closeMenu();

    // חזרה למסך הקודם
    navigation.goBack();
  };

  const handleApproveTask = async () => {
    console.log("Approve task clicked");

    try {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);

      const doc = await userDocRef.get();
      if (doc.exists) {
        const data = doc.data();
        const tasks = data.tasks;
        const profiles = data.profiles;

        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          const assignedTo = tasks[taskIndex].assignedTo;
          const rewardPoints = tasks[taskIndex].reward;

          tasks[taskIndex].status = "COMPLETED"; // שינוי ל-"Completed"
          tasks[taskIndex].endTime = new Date().toISOString;

          const profileIndex = profiles.findIndex((p) => p.id === assignedTo);
          if (profileIndex !== -1) {
            profiles[profileIndex].reward += rewardPoints;

            await userDocRef.update({ tasks, profiles });

            const updatedTask = { ...task, status: "COMPLETED", endTime: null };
            dispatch(updateReduxTask(updatedTask));
            setTask(updatedTask);

            const updatedProfiles = [...user.profiles];
            updatedProfiles[profileIndex] = {
              ...updatedProfiles[profileIndex],
              reward: profiles[profileIndex].reward,
            };
            dispatch(setReduxProfiles(updatedProfiles));

            console.log(
              `Task approved successfully. Added ${rewardPoints} points to profile ${profiles[profileIndex].name}.`
            );
          } else {
            console.error("Assigned profile not found.");
          }
        } else {
          console.error("Task not found in Firestore.");
        }
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error approving task:", error);
    }

    closeMenu();
  };

  const handleStatus = async (taskStatus) => {
    console.log("Changing status...");
    if (taskStatus === "WAITING_COMPLETE") {
      if (animationRef.current) {
        animationRef.current.play();
      }
    }
    updateTaskStatus({ user, task, status: taskStatus, dispatch });
  };

  useEffect(() => {
    if (task && task.title) {
      navigation.setOptions({
        title: task.title,
      });
    }

    const currentTime = new Date();
    const taskEndTime = new Date(task.endTime);

    if (taskEndTime > currentTime && task.status === "EXPIRED") {
      handleStatus("ACTIVE");
    } else if (taskEndTime < currentTime && task.status === "ACTIVE") {
      handleStatus("EXPIRED");
    }
  }, [task, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ position: "relative", zIndex: 10 }}>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={toggleMenu}>
            <MaterialIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [menuVisible, navigation]);

  // עדכון ה-state המקומי כאשר המטלה ב-Redux משתנה
  React.useEffect(() => {
    const updatedTask = getTaskById(user.tasks, route.params.taskID);
    setTask(updatedTask);
  }, [user.tasks]); // יפעל בכל פעם שהמטלות ב-Redux משתנות

  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  ); //

  const dispatch = useDispatch();

  const profile = getProfileById(user, selectedUser); // Always up-to-date
  const parental = profile ? profile.role === "parent" : true; // Always up-to-date

  console.log("profile.role", profile.role, parental);

  const [remaining, setRemaining] = useState(true);
  console.log("Task opened:", JSON.stringify(task, null, 2));

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        source={getBackgroundImage({ type: task.type })}
        style={{ height: "100%", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {parental && (
            <Modal
              transparent={true}
              visible={menuVisible}
              animationType="fade"
              onRequestClose={closeMenu}
            >
              <View style={styles.modalContainer}>
                {/* רקע כהה שמקיף את המסך */}
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={closeMenu} // סגירה בלחיצה מחוץ לתפריט
                />

                {/* תפריט נפתח */}
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleExtendTime}
                  >
                    <Text style={styles.menuText}>Extend Time</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleTransferProfile}
                  >
                    <Text style={styles.menuText}>Transfer the task</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleEditTask}
                  >
                    <Text style={styles.menuText}>Edit task</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleDeleteTask}
                  >
                    <Text style={styles.menuText}>Delete task</Text>
                  </TouchableOpacity>
                  {task.status === "WAITING_COMPLETE" && (
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={handleApproveTask}
                    >
                      <Text style={styles.menuText}>Accept task</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          )}
          <View style={{ marginTop: "2%", width: "100%", height: "8%" }}>
            <ProfileBar profile={profile} />
          </View>

          <View
            style={[
              styles.detailContainer,
              { height: "35%", marginTop: "3%", flexDirection: "column" },
            ]}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.chatTitle}>Task Details:</Text>
              <LottieView
                source={require("../assets/animations/task.json")}
                style={{
                  width: 35,
                  height: 35,
                  alignSelf: "center",
                }}
                autoPlay={true}
                loop={true}
              />
            </View>
            <View style={styles.lineSeparator} />
            <ScrollView>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={styles.semiBoldText}>Assigned to:{" "}</Text>
                <View style={styles.roundedImage}>
                  <Image
                    style={{ resizeMode: "cover", height: 30, width: 30 }}
                    source={profileImage}
                  />
                </View>
                <Text style={styles.lightText}>
                  {" "}
                  {assignedProfile.name},
                  {getProfileAge(assignedProfile.birth_day)}
                </Text>
                {task.status !== "COMPLETED" && (
                  <CountdownTimer
                    remaining={remaining}
                    setRemaining={setRemaining}
                    initialSeconds={getSecondsRemaining(task.endTime)}
                  />
                )}
                {task.status === "COMPLETED" && (
                  <Badge
                  badgeStyle={{
                    backgroundColor: '#98D8EF',
                    height: 30,
                    minWidth: 30, // Ensure enough space for text
                    paddingHorizontal: 10, // Add padding for text
                    borderRadius: 15, // Ensure rounded corners
                  }}
                    status="primary"
                    value={"Completed"}
                    textStyle={{
                      fontSize: 15,
                      fontFamily: "Fredoka-Bold",
                      color: "#000000",
                    }}
                    containerStyle={{marginStart: 30 }}
                  />
                )}
              </View>
              <View style={styles.separator} />
              <View style={{alignItems:'center',flexDirection:'row'}}>
                <Text style={styles.semiBoldText}>Type: </Text>
                <Text style={styles.lightText}>{taskTypes[task.type]}</Text>
              </View>
              <View style={styles.separator} />
              <Text style={styles.semiBoldText}>Description:{"\n"}</Text>
              <Text style={styles.lightText}>{task.description}</Text>
              <View style={styles.separator} />
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={styles.semiBoldText}>Reward points: </Text>
                <Animatable.View
                  animation="swing"
                  duration={1500}
                  iterationCount="infinite"
                  style={styles.coinStyle}
                >
                  <Text style={styles.lightText}>{task.reward}</Text>
                </Animatable.View>
                {!parental && task.status !== "EXPIRED" && (
                  <View style={{ marginTop: "2%" }}>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleStatus("WAITING_COMPLETE")}
                    >
                      <Text>Complete task</Text>
                    </TouchableOpacity>
                    <View style={styles.animationTask}>
                      <LottieView
                        source={getTaskAnimations({ type: task.type })}
                        style={{ width: 100, height: 100, zIndex: -1 }}
                        autoPlay
                        loop
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={{ height: 40 }} />
              <LottieView
                ref={animationRef}
                source={require("../assets/animations/confetti.json")}
                style={{
                  width: 500,
                  height: 500,
                  position: "absolute",
                  top: "50%", // Position vertically in the center
                  left: "50%", // Position horizontally in the center
                  transform: [{ translateX: -250 }, { translateY: -250 }], // Offset by half the width/height to truly center it
                }}
                speed={0.5}
                autoPlay={false}
                loop={false}
              />
            </ScrollView>
          </View>
          <View style={styles.chatContainer}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.chatTitle}>Task Chat:</Text>
              <LottieView
                source={require("../assets/animations/chat.json")}
                style={{
                  width: 35,
                  height: 35,
                  alignSelf: "center",
                }}
                autoPlay={true}
                loop={true}
              />
            </View>
            <View style={styles.lineSeparator} />
            <FlatList
              data={chat}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const name =
                  profile.id === item.profileId
                    ? "Me"
                    : getProfileById(user, item.profileId)?.name;
                return (
                  <View
                    style={[
                      styles.messageContainer,
                      {
                        backgroundColor:
                          profile.id === item.profileId
                            ? "#AEEA94"
                            : generateColor(item.profileId),
                        alignSelf:
                          profile.id === item.profileId
                            ? "flex-start"
                            : "flex-end",
                      },
                    ]}
                  >
                    <Text style={[styles.messageText]}>
                      {name}:{" "}
                    </Text>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.messageContext}>{item.text}</Text>
                      <Text style={styles.timestampText}>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={styles.chatList}
            />
          </View>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your message"
                value={newMessage}
                onChangeText={(message) => setNewMessage(message)}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(248, 248, 248, 0.7)", // Adjust the color and transparency
    padding: "2%",
  },
  roundedImage: {
    marginStart: 5,
    justifyContent: "center",
    borderWidth: 2,
    width: 30, // Increased width
    height: 30, // Increased height
    //borderRadius: 50, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
    backgroundColor: "transparent",
  },
  semiBoldText: {
    fontSize: calculateFontSize(22),
    fontFamily: "Fredoka-SemiBold",
  },
  lightText: {
    fontSize: calculateFontSize(18),
    fontFamily: "Fredoka-Regular",
  },
  detailContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.57)", // Adjust the color and transparency
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "grey",
    borderWidth: 3,
  },
  separator: {
    height: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 60, // מיקום מתחת לכפתור ההגדרות
    right: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    zIndex: 6, // שכבה מתחת לכפתור, מעל הרקע
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "relative",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5, // שכבה מתחת לכפתור ההגדרות
  },
  chatList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#E4F1F4",
    padding: 10,
    borderRadius: 8,
  },
  messageText: {
    fontSize: calculateFontSize(14),
    fontFamily: "Fredoka-SemiBold",
    color: "#000",
  },messageContext:{
    fontSize: calculateFontSize(14),
    fontFamily: "Fredoka-Regular",
    color: "#000",
  },timestampText: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#28A745",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  chatContainer: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.57)", // Adjust the color and transparency
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 3,
    flex: 0.7,
  },
  completeButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    marginStart: "25%",
    alignSelf: "center",
    zIndex: 2,
  },
  animationTask: {
    position: "absolute",
    height: 100,
    width: 100,
    marginTop: -85,
    marginHorizontal: 80,
    zIndex: -1,
  },
  chatTitle: {
    fontFamily: "Fredoka-Bold",
    fontSize: calculateFontSize(20),
    alignSelf: "center",
  },
  lineSeparator: {
    height: 1, // Thickness of the line
    backgroundColor: "#999", // Color of the line
    marginVertical: 3, // Space above and below the line
  },
  coinStyle: {
    backgroundColor: "#F3C623",
    borderRadius: 50,
    padding: 3,
    borderColor: "black",
    borderWidth: 2,
  },
});

export default TaskScreen;
