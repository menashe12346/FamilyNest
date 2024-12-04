import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import Home from './src/screen/Home';
import NewScreen from './src/screen/NewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewScreen" component={NewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    </Provider>
  );
};

export default App;