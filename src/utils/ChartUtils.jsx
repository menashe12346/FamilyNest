export const chartConfig = {
    backgroundColor: "rgba(252, 252, 252, 0.45)", // Adjust the color and transparency
    backgroundGradientFrom: "rgba(255, 255, 255, 0.21)", // Adjust the color and transparency
    backgroundGradientTo: "rgba(230, 230, 230, 0.27)", // Adjust the color and transparency
    decimalPlaces: 1, // For numeric precision
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };