// jest-setup.js

// Mock for expo-modules-core
jest.mock('expo-modules-core', () => {
    const EventEmitter = require('events');
    return {
      requireNativeModule: jest.fn(() => ({})),
      EventEmitter,
    };
  });
  
  // Mock for expo-linear-gradient
  jest.mock('expo-linear-gradient', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      LinearGradient: (props) => React.createElement(View, props, props.children),
    };
  });
  
  // Mock for @expo/vector-icons
  jest.mock('@expo/vector-icons', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
      FontAwesome: (props) => React.createElement(Text, null, props.name),
      AntDesign: (props) => React.createElement(Text, null, props.name),
    };
  });
  
  // Mock for react-native-element-dropdown
  jest.mock('react-native-element-dropdown', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      Dropdown: (props) => React.createElement(View, props, props.children),
    };
  });
  
  // Mock for @rneui/themed
  jest.mock('@rneui/themed', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      Avatar: (props) => React.createElement(View, props, props.children),
    };
  });
  
  // Mock for @react-native-community/datetimepicker
  jest.mock('@react-native-community/datetimepicker', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      __esModule: true,
      default: (props) => React.createElement(View, props, props.children),
    };
  });
  
  // Mock for @rneui/base
  jest.mock('@rneui/base', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
      Button: (props) => React.createElement(Text, null, 'Button'),
    };
  });
  
  // Mock for expo-image-picker
  jest.mock('expo-image-picker', () => {
    return {
      __esModule: true,
      launchCameraAsync: jest.fn(),
      launchImageLibraryAsync: jest.fn(),
      requestCameraPermissionsAsync: jest.fn(() =>
        Promise.resolve({ status: 'granted' })
      ),
      requestMediaLibraryPermissionsAsync: jest.fn(() =>
        Promise.resolve({ status: 'granted' })
      ),
    };
  });
  
  // Mock for react-native-toast-message
  jest.mock('react-native-toast-message', () => {
    return {
      __esModule: true,
      default: {
        show: jest.fn(),
        hide: jest.fn(),
      },
    };
  });
  
  // Mock for expo-web-browser
  jest.mock('expo-web-browser', () => {
    return {
      __esModule: true,
      openBrowserAsync: jest.fn(),
      maybeCompleteAuthSession: jest.fn(),
    };
  });
  
  // Mock for expo-auth-session/providers/google
  jest.mock('expo-auth-session/providers/google', () => {
    return {
      __esModule: true,
      // Return a stub that disables Google auth logic for testing.
      // This hook now returns [request, response, promptAsync] where response is null.
      useIdTokenAuthRequest: jest.fn(() => [null, null, jest.fn()]),
    };
  });
  