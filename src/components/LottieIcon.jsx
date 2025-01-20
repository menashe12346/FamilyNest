import React from "react";
import LottieView from "lottie-react-native";

const LottieIcon = ({ source, style }) => {
    console.log("source",source)
  return (
    <LottieView
      source={source}
      autoPlay
      loop={true}
      style={{height:40,width:40}}
      speed={0.4}
    />
  );
};

export default LottieIcon;