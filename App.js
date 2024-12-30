import React from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigators/AppNavigator";
import store from './src/Redux/store';
import * as SplashScreen from "expo-splash-screen"; // Optional for handling splash screen
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from 'react-redux'; // Import hooks

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    "Fredoka-Bold": require("./src/assets/fonts/Fredoka_Condensed-Bold.ttf"), // Replace with your font file path
  });

  // Prevent the splash screen from hiding before fonts are loaded
  React.useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show nothing (or a loading indicator) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}