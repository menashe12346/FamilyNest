import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import LoginScreen from './src/screen/LoginScreen';
import SelectProfileScreen from './src/screen/SelectProfileScreen';
import NewScreen from './src/screen/NewScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import Home from './src/screen/Home';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load Fredoka font
        await Font.loadAsync({
          'Fredoka-Regular': require('./src/assets/fonts/Fredoka_Condensed-Regular.ttf'),
          'Fredoka-Bold': require('./src/assets/fonts/Fredoka_Condensed-Bold.ttf'),
        });

        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null; // Keep splash screen visible while loading
  }

  // Override default Text styles globally
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'Fredoka-Regular' };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home" // Set Home as the default screen
            screenOptions={{
              headerStyle: { backgroundColor: '#E4F1F4' },
              headerTintColor: '#542F2F',
              headerTitleStyle: { fontFamily: 'Fredoka-Bold', fontSize: 20 },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SelectProfileScreen" component={SelectProfileScreen} />
            <Stack.Screen name="NewScreen" component={NewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
