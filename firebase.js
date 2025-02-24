import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCnAfe8Dc6ZZFy3QBGEx0F-CIpbOWj1e1U",
  authDomain: "familynest-88e60.firebaseapp.com",
  projectId: "familynest-88e60",
  storageBucket: "familynest-88e60.firebasestorage.app",
  messagingSenderId: "888794901178",
  appId: "1:888794901178:web:15b2b704ed44d781d27083",
  measurementId: "G-18N7BG9423"
};

// ✅ Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ✅ Configure Expo Notifications (Must be called once at the start)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ✅ Request Push Notification Permissions
export const requestUserPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("❌ Push Notification Permissions Denied");
    return;
  }

  console.log("✅ Push Notification Permissions Granted");
};

// ✅ Get **Expo Push Token** (Expo Managed Workflow)
export const getExpoPushToken = async () => {
  if (!Constants.isDevice) {
    console.log("❌ Must use a physical device for Push Notifications");
    return;
  }

  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    console.log("✅ Expo Push Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error getting Expo push token:", error);
  }
};

// ✅ Handle **Foreground Notifications**
export const setupForegroundNotificationListener = () => {
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log("📩 Foreground Notification Received:", notification);
  });

  return () => subscription.remove(); // Cleanup listener when component unmounts
};

// ✅ Export Firebase
export { firebase };
