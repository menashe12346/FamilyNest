// __tests__/LoginScreen.test.js

jest.setTimeout(30000); // Increase overall timeout for this file

// --- Mocks for react-native-gesture-handler ---
jest.mock('react-native-gesture-handler', () => ({
  FlatList: require('react-native').FlatList,
  TextInput: require('react-native').TextInput,
  GestureHandlerRootView: require('react-native').View,
}));

// --- Mock for react-navigation ---
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// --- Firebase Mock ---
// Export an object with a "firebase" property so that
// if LoginScreen imports { firebase } from '../../firebase', it receives this.
jest.mock('../../firebase', () => ({
  firebase: {
    auth: () => ({
      signInWithEmailAndPassword: jest.fn((email, password) => {
        if (email === 'a@gmail.com' && password === '123456') {
          return Promise.resolve({
            user: { uid: 'DZ9TA9xOGSdo4SbcAzljE3P9iaH3', email },
          });
        }
        return Promise.reject(new Error('Invalid credentials'));
      }),
    }),
    firestore: () => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() =>
            Promise.resolve({
              exists: true,
              data: () => ({
                email: 'a@gmail.com',
                familyName: 'a',
                birth_day: '1990-01-20',
                gender: 'male',
                passkey: '1234',
                points: 0,
                phoneNumber: '',
                partnerEmail: '',
                role: 'parent',
                userName: 'a',
                profiles: [],
              }),
            })
          ),
        })),
      })),
    }),
  },
}));

import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/userSlice'; // Adjust path if needed
import LoginScreen from '../screens/LoginScreen'; // Adjust path if needed

// Helper to flush pending promises using setTimeout.
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('LoginScreen', () => {
  let store;

  beforeEach(() => {
    // Create a real Redux store using your actual user reducer.
    store = configureStore({
      reducer: { user: userReducer },
    });
    mockNavigate.mockClear();

    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
  });

  it('מציג את האלמנטים הראשוניים (כותרות ושדות)', () => {
    expect(screen.getByText('Welcome!')).toBeTruthy();
    expect(screen.getByText('Login to your account')).toBeTruthy();
    expect(screen.getByPlaceholderText('Username or Email address')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText("Don't have an account?Create")).toBeTruthy();
  });

  it('מאפשר הקלדת username ו-password', () => {
    const usernameInput = screen.getByPlaceholderText('Username or Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.changeText(usernameInput, 'a@gmail.com');
    fireEvent.changeText(passwordInput, '123456');

    expect(usernameInput.props.value).toBe('a@gmail.com');
    expect(passwordInput.props.value).toBe('123456');
  });

  it('נווט למסך Signup בעת לחיצה על "Create"', () => {
    const createText = screen.getByText("Don't have an account?Create");
    fireEvent.press(createText);
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });

  it('מטפל בלחיצה על כפתור "Log in" (פונקציה/ניווט)', async () => {
    // ממלאים אימייל וסיסמה
    fireEvent.changeText(screen.getByPlaceholderText('Username or Email address'), 'a@gmail.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), '123456');
  
    // לוחצים על הכפתור עם testID="loginButton"
    await act(async () => {
      fireEvent.press(screen.getByTestId('loginButton'));
      // המתנה לאסינכרוניות
      await flushPromises();
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
  
    // מוודאים שנקראה הניווט
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Drawer', expect.any(Object));
    }, { timeout: 20000 });
  });  
});
