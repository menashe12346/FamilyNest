import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateFontSize } from '../utils/FontUtils';

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

    if(days){
        return `${days}d ${hours}:${minutes}:${seconds}`;
    }else if(hours){
        return `${hours}:${minutes}:${seconds}`;
    }else if(minutes){
        return `${minutes}:${seconds}`;
    }
    else if(seconds){
        return `${seconds}s`;
    }else{
        return 'time ended'
    }
  };



   useEffect(() => {
    setRemaining(secondsLeft > 0);
  }, [secondsLeft, setRemaining]);

  return (
    <View style={styles.container}>
      <Text style={[styles.timer,{color: secondsLeft>0? 'black':'red'}]}>
        {secondsLeft > 0 ? formatTime(secondsLeft) : 'Expired'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  timer: {
    fontSize: calculateFontSize(14),
    fontFamily:'Fredoka-Bold'
  },
});

export default CountdownTimer;
