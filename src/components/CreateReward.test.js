jest.mock('react-native-gesture-handler', () => {
    return {
      FlatList: require('react-native').FlatList,  // Mock FlatList
      TextInput: require('react-native').TextInput, // Mock TextInput
      GestureHandlerRootView: require('react-native').View, // Mock GestureHandlerRootView (if used)
    };
  });
  

import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import CreateReward from './CreateReward'; // Replace with the correct path

// Mock reward options and other necessary data
const mockRewardsOptions = [
  { id: 1, reward: 'Beach', content: require('../assets/animations/rewards/beach.json') },
  { id: 2, reward: 'Bicycle', content: require('../assets/animations/rewards/bicycle.json') },
];

jest.mock('../utils/RewardUtils', () => ({
  rewardsOptions: mockRewardsOptions,
}));

describe('CreateReward', () => {
  const setShowModal = jest.fn();
  const setReward = jest.fn();

  beforeEach(() => {
    render(
      <CreateReward
        show={true}
        setShowModal={setShowModal}
        reward={null}
        setReward={setReward}
      />
    );
  });

  it('should render the modal with correct initial elements', () => {
    // Check if the modal and key elements are rendered
    expect(screen.getByText('Choose reward:')).toBeTruthy();
    expect(screen.getByText('Set price and quantity:')).toBeTruthy();
    expect(screen.getByPlaceholderText('Price')).toBeTruthy();
    expect(screen.getByText('Quantity:')).toBeTruthy();
  });

  it('should close the modal on cancel', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.press(cancelButton);

    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
