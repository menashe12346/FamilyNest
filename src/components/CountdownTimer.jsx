import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { calculateFontSize } from "../utils/FontUtils";
import { Badge } from "react-native-elements";

const CountdownTimer = ({ initialSeconds, remaining, setRemaining }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    if (days) {
      return `${days} days`;
    } else if (hours) {
      return `${hours}h:${minutes}`;
    } else if (minutes) {
      return `${minutes}:${seconds}`;
    } else if (seconds) {
      return `${seconds}s`;
    } else {
      return "time ended";
    }
  };

  useEffect(() => {
    setRemaining(secondsLeft > 0);
  }, [secondsLeft, setRemaining]);

  return (
    <View style={styles.container}>
      <Badge
        badgeStyle={{
          backgroundColor: remaining>0? '#5DB996':"#EB5A3C",
          height: 30,
          minWidth: 30, // Ensure enough space for text
          paddingHorizontal: 2, // Add padding for text
          borderRadius: 15, // Ensure rounded corners
        }}
        status={
          secondsLeft > 0
            ? secondsLeft > 60 * 60 * 2
              ? "success"
              : "warning"
            : "error"
        }
        value={secondsLeft > 0 ? formatTime(secondsLeft) : "Expired"}
        textStyle={styles.timer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  timer: {
    fontSize: calculateFontSize(12),
    fontFamily: "Fredoka-Regular",
    color: "black",
    textAlign: "center",
  },
});

export default CountdownTimer;
