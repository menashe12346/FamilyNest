import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions ,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewScreen from './NewScreen';
import SelectProfileScreen from './SelectProfileScreen';
import { calculateFontSize } from '../utils/FontUtils';
import avatarImages from '../utils/AvatarsUtils';

const { width, height } = Dimensions.get('window');

const Home = ({navigation, route}) => {
  console.log('Route Home:', route);
  userData = route.params.userData;
  console.log('User Data:', userData);

  const imageID = parseInt(userData.profiles[0].imageID);

  // Select the avatar image dynamically from the avatarImages object
  const selectedAvatar = avatarImages[imageID] || avatarImages[1]; 
  console.log('Selected Avatar:', avatarImages[imageID]);
  

  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Image source={selectedAvatar} style={styles.avatarImage} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: calculateFontSize(48),
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
    fontSize: calculateFontSize(30),
    color: 'white',
    fontWeight: 'bold',
  },
  avatarCircle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: '5%',
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 50, // Make it a circle
    overflow: 'hidden', // Ensure the image is contained within the circle
  },
  avatarImage: {
    width: '100%', // Adjust the width to fill the circle
    height: '100%', // Adjust the height to fill the circle
    resizeMode: 'cover',
  },
});


export default Home;