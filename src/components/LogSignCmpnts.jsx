import React from 'react';
import { View, Text, TextInput , TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome , AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const TextInputField = ({ placeholder, iconName, secureTextEntry, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <FontAwesome name={iconName} size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
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
      marginHorizontal: 40,
      elevation: 10,
      marginVertical: 10,
      height:60,
    },
    inputIcon: {
      marginLeft: 15,
      alignSelf: "baseline",
      marginTop: 15,
    },
    textInput: {
      fontSize: 18,
      flex: 1,
      marginLeft: 10,
    },buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 30,
      width: "90%",
      justifyContent: "flex-end",
    },
    linearGradient: {
      elevation: 10,
      height: 45,
      width: 90,
      borderRadius: 70,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
    },
  });