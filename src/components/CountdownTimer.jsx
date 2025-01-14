import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateFontSize } from '../utils/FontUtils';
import { Badge } from 'react-native-elements';

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
        return `${(days*24)+hours}:${minutes}:${seconds}`;
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
      <Badge status={secondsLeft>0? ((secondsLeft>60*60*2)?'success':'warning'):'error'}
        value={secondsLeft > 0 ? formatTime(secondsLeft) : 'Expired'}
        textStyle={styles.timer}
        badgeStyle={{height:25,elevation:5}}
        />
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
    fontSize: calculateFontSize(16),
    fontFamily:'Fredoka-Bold',
    color:'black',
    textAlign:'center'
  },
});

export default CountdownTimer;
