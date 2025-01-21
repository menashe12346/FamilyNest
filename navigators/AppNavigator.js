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
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import TaskScreen from "../src/screens/TaskScreen";
import RewardsScreen from "../src/screens/RewardsScreen";
import LottieIcon from "../src/components/LottieIcon";

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({route}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? require('../src/assets/animations/tab/home-focused.json') : require('../src/assets/animations/tab/home.json') ;
        } else if (route.name === "RewardsScreen") {
          iconName = focused ? require('../src/assets/animations/tab/reward-focused.json')  : require('../src/assets/animations/tab/reward.json') ;
        }
        console.log(iconName)
        return <LottieIcon source={iconName} />;

      },
      tabBarLabel: ({ focused, color }) => {
        return (
          <Text
            style={{
              fontSize: 14, // You can adjust this value for bigger text
              fontFamily:'Fredoka-Bold', // Optional: makes the text bold
              color: focused ? "#000" : "#777", // Change the color based on focus
            }}
          >
            {route.name === "Home" ? "Home" : "Rewards"}
          </Text>
        );
      },
      tabBarActiveTintColor: "#000", // Active icon and label color
      tabBarInactiveTintColor: "#777", // Inactive icon and label color
      headerShown: false,
    })}>
      
      <Tab.Screen name="Home" component={Home} initialParams={route.params} />
      {/* <Tab.Screen name="NewScreen" component={NewScreen} initialParams={route.params}  /> */}
      {/* <Tab.Screen name="SelectProfileScreen" component={SelectProfileScreen}/> */}
      <Tab.Screen name="RewardsScreen" component={RewardsScreen}
      options={{title:'Rewards'}}/>
    </Tab.Navigator>
  );
}


function DrawerNavigator({route}) {
  return (
    <Drawer.Navigator
    initialRouteName="SelectProfileScreen">
     <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        initialParams={route.params}
        options={{
          drawerItemStyle: { display: 'none' }, // Hide from drawer menu
          title:''
        }}
      />
      <Drawer.Screen name="SelectProfileScreen" component={SelectProfileScreen}
      options={
        {
          title:"Select Profile"
        }
      }/>
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
        <Stack.Screen name="TaskScreen" component={TaskScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;