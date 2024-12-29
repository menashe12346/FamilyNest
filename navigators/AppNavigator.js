// AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import your screens
import LoginScreen from "../src/screens/LoginScreen";
import SignUpScreen from "../src/screens/SignUpScreen";
import Home from "../src/screens/Home";
import SelectProfileScreen from "../src/screens/SelectProfileScreen";
import NewScreen from "../src/screens/NewScreen";

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#E4F1F4" },
          headerTintColor: "#542F2F",
          headerTitleStyle: { fontFamily: "Fredoka-Bold", fontSize: 20 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SelectProfileScreen" component={SelectProfileScreen} />
        <Stack.Screen name="NewScreen" component={NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;