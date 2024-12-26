import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewScreen from './NewScreen';
import SelectProfileScreen from './SelectProfileScreen';

const { width, height } = Dimensions.get('window');

const calculateFontSize = (size) => Math.min(width, height) * (size / 100);

const HomeScreen = ({navigation, route}) => {
  console.log('Route:', route);
  console.log('User:', route.params.user.userData.familyName);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parents Screen</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() =>
          navigation.navigate('NewScreen', {
            items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
          })
        }
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function Home({route}) {
  console.log('route>?:', route.params);
  const user = route.params;
  console.log('User?>:', user);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewScreen') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'SelectProfile') {
            iconName = focused ? 'people' : 'people-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen initialParams={{user}} name="Home" component={HomeScreen} />
      <Tab.Screen name="NewScreen" component={NewScreen} />
      <Tab.Screen name="SelectProfile" component={SelectProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: calculateFontSize(10),
    fontWeight: 'bold',
    color: '#542F2F',
    marginBottom: '10%',
  },
  button: {
    width: '17%',
    height: '8%',
    borderRadius: 800,
    backgroundColor: '#B85455',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: calculateFontSize(5),
    color: 'white',
    fontWeight: 'bold',
  },
});
