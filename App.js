import React from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigators/AppNavigator";
import store from './src/Redux/store';
import * as SplashScreen from "expo-splash-screen"; // Optional for handling splash screen
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import Toast from "react-native-toast-message";

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    "Fredoka-Condensed-Bold": require("./src/assets/fonts/Fredoka_Condensed-Bold.ttf"),
    "Fredoka-Condensed-Light": require("./src/assets/fonts/Fredoka_Condensed-Light.ttf"),
    "Fredoka-Condensed-Medium": require("./src/assets/fonts/Fredoka_Condensed-Medium.ttf"),
    "Fredoka-Condensed-Regular": require("./src/assets/fonts/Fredoka_Condensed-Regular.ttf"),
    "Fredoka-Condensed-SemiBold": require("./src/assets/fonts/Fredoka_Condensed-SemiBold.ttf"),
    "Fredoka-Expanded-Bold": require("./src/assets/fonts/Fredoka_Expanded-Bold.ttf"),
    "Fredoka-Expanded-Light": require("./src/assets/fonts/Fredoka_Expanded-Light.ttf"),
    "Fredoka-Expanded-Medium": require("./src/assets/fonts/Fredoka_Expanded-Medium.ttf"),
    "Fredoka-Expanded-Regular": require("./src/assets/fonts/Fredoka_Expanded-Regular.ttf"),
    "Fredoka-Expanded-SemiBold": require("./src/assets/fonts/Fredoka_Expanded-SemiBold.ttf"),
    "Fredoka-SemiCondensed-Bold": require("./src/assets/fonts/Fredoka_SemiCondensed-Bold.ttf"),
    "Fredoka-SemiCondensed-Light": require("./src/assets/fonts/Fredoka_SemiCondensed-Light.ttf"),
    "Fredoka-SemiCondensed-Medium": require("./src/assets/fonts/Fredoka_SemiCondensed-Medium.ttf"),
    "Fredoka-SemiCondensed-Regular": require("./src/assets/fonts/Fredoka_SemiCondensed-Regular.ttf"),
    "Fredoka-SemiCondensed-SemiBold": require("./src/assets/fonts/Fredoka_SemiCondensed-SemiBold.ttf"),
    "Fredoka-SemiExpanded-Bold": require("./src/assets/fonts/Fredoka_SemiExpanded-Bold.ttf"),
    "Fredoka-SemiExpanded-Light": require("./src/assets/fonts/Fredoka_SemiExpanded-Light.ttf"),
    "Fredoka-SemiExpanded-Medium": require("./src/assets/fonts/Fredoka_SemiExpanded-Medium.ttf"),
    "Fredoka-SemiExpanded-Regular": require("./src/assets/fonts/Fredoka_SemiExpanded-Regular.ttf"),
    "Fredoka-SemiExpanded-SemiBold": require("./src/assets/fonts/Fredoka_SemiExpanded-SemiBold.ttf"),
    "Fredoka-Bold": require("./src/assets/fonts/Fredoka-Bold.ttf"),
    "Fredoka-Light": require("./src/assets/fonts/Fredoka-Light.ttf"),
    "Fredoka-Medium": require("./src/assets/fonts/Fredoka-Medium.ttf"),
    "Fredoka-Regular": require("./src/assets/fonts/Fredoka-Regular.ttf"),
    "Fredoka-SemiBold": require("./src/assets/fonts/Fredoka-SemiBold.ttf"),
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
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}