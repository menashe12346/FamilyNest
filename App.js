import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name= "Login" component={LoginScreen}/>
          <Stack.Screen name= "SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App