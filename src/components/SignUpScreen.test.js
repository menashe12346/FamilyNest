// Mocking react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
    FlatList: require('react-native').FlatList,
    GestureHandlerRootView: require('react-native').View,
}));

import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/userSlice';
import SignUpScreen from '../screens/SignUpScreen';
import { firebase } from '../../firebase';

// פתרון לבעיה של setImmediate
global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);

// Mocking Firebase
jest.mock('../../firebase', () => ({
    firebase: {
        auth: jest.fn(() => ({
            createUserWithEmailAndPassword: jest.fn((email, password) => {
                if (email === 'test@gmail.com' && password === '123456') {
                    return Promise.resolve({ user: { uid: 'testUID' } });
                }
                return Promise.reject(new Error('Invalid credentials'));
            }),
        })),
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    set: jest.fn(() => Promise.resolve()),
                })),
            })),
        })),
    },
}));

// Mocking Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('SignUpScreen', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: { user: userReducer },
        });

        jest.clearAllMocks();
    });

    it('מציג את כותרת ההרשמה', () => {
        const { getByText } = render(
            <Provider store={store}>
                <SignUpScreen />
            </Provider>
        );

        expect(getByText(/Create your FamilyNest account!/i)).toBeTruthy();
    });

    it('לא מאפשר הרשמה עם שדות ריקים', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <SignUpScreen />
            </Provider>
        );

        fireEvent.press(getByText('Sign Up'));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Please fill in all fields');
        });
    });

    it('מפעיל את הכפתור "Sign Up"', () => {
        const { getByText } = render(
            <Provider store={store}>
                <SignUpScreen />
            </Provider>
        );

        const signUpButton = getByText('Sign Up');
        expect(signUpButton).toBeTruthy();

        fireEvent.press(signUpButton);
    });
});
