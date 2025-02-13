module.exports = {
    preset: 'react-native', // Ensure you're using the React Native preset
    testEnvironment: 'jest-environment-jsdom', // For jsdom environment
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Handles .jsx files
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|react-native-reanimated)/)', // Allow transforming dependencies
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // Optional, if you're using jest-native matchers
  };
  