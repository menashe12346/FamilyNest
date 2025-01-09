import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ValuePicker = ({value,setValue}) => {
  const increment = () => setValue(prev => (prev < 20 ? prev + 1:20));
  const decrement = () => setValue(prev => (prev > 0 ? prev - 1 : 0)); // Prevent going below 0

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.valueText}>{value}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
    //marginHorizontal: 5,
    elevation:5
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily:'Fredoka-Bold'
  },
  valueText: {
    textAlign:'center',
    width:30,
    fontSize: 20,
    fontFamily:'Fredoka-Bold'
  },
});

export default ValuePicker;