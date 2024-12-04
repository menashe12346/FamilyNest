import React from 'react';
import { View, Text, TextInput , TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome , AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { calculateFontSize } from '../utils/FontUtils';


export const TextInputField = ({ placeholder, iconName, secureTextEntry, value, onChangeText, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <FontAwesome name={iconName} size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const GradientButton = ({colors, iconName, iconColor, iconSize, style }) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.linearGradient, style]}
    >
      <AntDesign name={iconName} size={iconSize} color={iconColor} />
    </LinearGradient>
  );
};
  
  const styles = StyleSheet.create({
    inputContainer: {
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      borderRadius: 20,
      marginHorizontal: '12%',
      elevation: 10,
      marginVertical: '1.5%',
      height:'5%',
    },
    inputIcon: {
      marginLeft: '4%',
      alignSelf: "baseline",
      marginTop: '4.5%',
    },
    textInput: {
      fontSize: calculateFontSize(16),
      flex: 1,
      marginLeft: '1%',
    },buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: '10%',
      width: "90%",
      justifyContent: "flex-end",
    },
    linearGradient: {
      elevation: 10,
      height: '20%',
      width: '120%',
      borderRadius: 70,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: '5%',
    },
  });