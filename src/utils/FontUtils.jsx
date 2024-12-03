import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Calculate responsive font size
 * @param {number} baseSize - The base font size to scale from
 * @returns {number} - Scaled font size
 */
export const calculateFontSize = (baseSize) => {
  // Adjust the scale factor as needed
  const scaleFactor = width / 375; // Assuming 375 is the base width for design
  return Math.round(baseSize * scaleFactor);
};