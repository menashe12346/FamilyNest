// AppNavigator.js
import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import your screens
import LoginScreen from "../src/screens/LoginScreen";
import SignUpScreen from "../src/screens/SignUpScreen";
import Home from "../src/screens/Home";
import SelectProfileScreen from "../src/screens/SelectProfileScreen";
import NewScreen from "../src/screens/NewScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home";
        } else if (route.name === "NewScreen") {
          iconName = focused ? "pluscircle" : "pluscircleo";
        } else if (route.name === "SelectProfileScreen") {
          iconName = focused ? "star" : "staro";
        }
        return <AntDesign name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#B85455",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewScreen" component={NewScreen} />
      <Tab.Screen name="SelectProfileScreen" component={SelectProfileScreen} />
    </Tab.Navigator>
  );
}


function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

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
        <Stack.Screen name="Drawer" component={DrawerNavigator} 
        options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;