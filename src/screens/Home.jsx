import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewScreen from './NewScreen';
import SelectProfileScreen from './SelectProfileScreen';
import { calculateFontSize } from '../utils/FontUtils';

const { width, height } = Dimensions.get('window');

const Home = ({navigation, route}) => {
  //console.log('Route:', route);
  //console.log('User:', route.params.userData);
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
});


export default Home;