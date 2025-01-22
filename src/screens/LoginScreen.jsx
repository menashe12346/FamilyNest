import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TextInputField, GradientButton } from "../components/LogSignCmpnts";
import { calculateFontSize } from "../utils/FontUtils";
import { connect } from "react-redux";
import { firebase } from "../../firebase";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../utils/FetchData";
import { useSelector } from "react-redux";
import { setUser } from "../Redux/userSlice";
import LottieView from "lottie-react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /*
  Animation
  */
  const viewPosition = useSharedValue(1000);
  const animatedView = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: viewPosition.value,
        },
      ],
    };
  });

  const signIn = async () => {
    if (username !== "" && password !== "") {
      console.log("Attempting to sign in...");
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(username, password);
        const firebaseUser = userCredential.user;
        console.log("From LoginScreen (UID)", firebaseUser.uid);

        // Fetch user data from Firestore
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(firebaseUser.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data(); // Fetch the user data from Firestore
          console.log("Fetched user data:", userData);

          // Dispatch the user data to Redux
          dispatch(
            setUser({
              uid: firebaseUser.uid, // Set user UID
              email: firebaseUser.email, // Firebase email
              familyName: userData.familyName || "", // Add Firestore data
              userName: userData.userName || "",
              profiles: userData.profiles || [],
              tasks: userData.tasks || [],
              rewards: userData.rewards || [],
              target: userData.target || {},
            })
          );

          // Navigate to the main screen
          await handleSignIn();
        } else {
          console.warn("User document does not exist in Firestore");
        }
      } catch (error) {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          
        } else if (error.code === "auth/user-not-found") {
          console.log("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          console.log("Incorrect password.");
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    } else {
      console.log("Username and password cannot be empty");
    }
  };

  const handleSignIn = async () => {
    // Navigate to the NewScreen when login is pressed
    console.log("Signed User data:", user);

    navigation.navigate("Drawer", { userData: user });
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  useEffect(() => {
    viewPosition.value = withTiming(0, { duration: 1500 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedView}>
        <View style={styles.loginBackgrondContainer}>
          <Image
            source={require("../assets/images/Designer.png")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Welcome!</Text>
        </View>
        <View>
          <Text style={styles.loginText}>Login to your account</Text>
        </View>
        <View style={{ marginTop: 20 }} />
        <TextInputField
          placeholder="Username or Email address"
          iconName="user"
          secureTextEntry={false}
          value={username}
          onChangeText={(text) => setUsername(text)}
          inputMode="email"
        />
        <TextInputField
          placeholder="Password"
          iconName="lock"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputMode="text"
        />
        <View style={styles.logInContainer}>
          <Text style={styles.logInText}>Log in</Text>
          <TouchableOpacity onPress={signIn}>
            <GradientButton
              colors={["#E99091", "#CD9D9E", "#B85455"]}
              iconName="arrowright"
              iconColor="white"
              iconSize={24}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{alignSelf:'center',marginTop:50}} onPress={handleCreateAccount}>
          <Text style={styles.footerText}>
            Don't have an account?
            <Text style={{ textDecorationLine: "underline" }}>Create</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.blobContainer}>
          <Image
            source={require("../assets/images/lowBlob.png")}
            style={styles.lowBlob}
          />
                      <LottieView
              source={require("../assets/animations/hello.json")}
              style={{ marginTop:-230,alignSelf:'baseline',position:'absolute',width: 350, height: 350 }}
              autoPlay
              loop
            />
          <View style={styles.helloAnimation}>

          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F9FF",
    flex: 1,
  },
  loginBackgrondContainer: {
    height: "25%",
  },
  backgroundImage: {
    marginTop: "1%",
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  helloContainer: {
    marginTop: 10,
  },
  helloText: {
    textAlign: "center",
    fontSize: calculateFontSize(45),
    //fontWeight: 700,
    color: "#542F2F",
    fontFamily: "Fredoka-Bold",
  },
  loginText: {
    textAlign: "center",
    fontSize: calculateFontSize(22),
    fontFamily: "Fredoka-Bold",
    color: "#542F2F",
    marginBottom: "1%",
  },
  logInContainer: {
    flexDirection: "row",
    marginTop: "1%",
    marginHorizontal: "50%",
    width: "90%",
    justifyContent: "flex-start",
  },
  logInText: {
    color: "#542F2F",
    fontSize: calculateFontSize(27),
    fontFamily: "Fredoka-Bold",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    color: "black",
    fontSize: calculateFontSize(16),
    fontFamily: "Fredoka-Bold",
    marginTop: "1%",
  },
  blobContainer: {
    height: "50%",
    width: "50%",
    textAlign: "center",
    marginTop: "-70",
    marginStart:5,
    zIndex: -1,
  },
  lowBlob: {
    resizeMode: "contain",
  },
  helloAnimation: {
    height: 350,
    width: 350,
  },
});

export default LoginScreen;
