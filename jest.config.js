module.exports = {
  preset: 'react-native',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|@expo/vector-icons|expo-font|expo-linear-gradient|expo-modules-core)/)',
  ],
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
