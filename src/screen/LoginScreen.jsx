import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, {useSharedValue,useAnimatedStyle,withTiming} from 'react-native-reanimated';
import globalStyles from '../styles/GlobalStyles';
import {TextInputField,GradientButton } from '../components/LogSignCmpnts';
import { calculateFontSize } from '../utils/FontUtils';


const LoginScreen = () => {

  const navigation = useNavigation();

  /*
  Animation
  */
  const viewPosition = useSharedValue(1000);
  const animatedView = useAnimatedStyle(()=>{
    return{
      transform: [
        {
          translateY: viewPosition.value,
        },
      ],
    };
  });
  
  const handleSignUp= () =>{

    navigation.navigate("SignUp");
    
  }

  useEffect(()=>{
    viewPosition.value = withTiming(0,{duration: 1500});
  },[]);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedView}>
          <View style={styles.loginBackgrondContainer}>
              <Image source={require("../assets/images/top_house2.png")} style={styles.backgroundImage}/>
          </View>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Welcome!</Text>
        </View>
        <View>
          <Text style={styles.loginText}>Login to your account</Text>
        </View>
        <TextInputField
          placeholder="Username"
          iconName="user"
          secureTextEntry={false}
        />
       <TextInputField
          placeholder="Password"
          iconName="lock"
          secureTextEntry={true}
        />
        <View style={styles.logInContainer}>
          <Text style={styles.logInText}>Log in</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <GradientButton
              colors={["#E99091", "#CD9D9E", "#B85455"]}
              iconName="arrowright"
              iconColor="white"
              iconSize={24}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.footerText}>Don't have an account? 
          <Text style={{textDecorationLine:"underline"}}>Create</Text>
        </Text>
        </TouchableOpacity>
        <View style={styles.blobContainer}>
          <Image source={require("../assets/images/lowBlob.png")} style={styles.lowBlob}/>
        </View>
      </Animated.View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#E4F1F4",
        flex: 1
    },loginBackgrondContainer:{
      height:'27%',
    },backgroundImage:{
      marginTop:'1%',
      height:"100%",
      width:"100%",
      resizeMode:'contain'
    },helloContainer:{
    },helloText:{
      textAlign:"center",
      fontSize: calculateFontSize(45) ,
      fontWeight: 700,
      color: "#542F2F",
    },loginText:{
      textAlign:"center",
      fontSize: calculateFontSize(22),
      fontWeight:500,
      color: "#542F2F",
      marginBottom:'1%'
    },logInContainer:{
      flexDirection:"row",
      marginTop:'3%',
      marginHorizontal:'50%',
      width:"90%",
      justifyContent:'flex-start'
    },logInText:{
      color:"#542F2F",
      fontSize:calculateFontSize(27),
      fontWeight:"bold",
      textAlign:"center"
    },footerText:{
      textAlign:"center",
      color:"black",
      fontSize:calculateFontSize(16),
      marginTop:'1%'
    },blobContainer:{
      height:'50%',
      width:'50%',
      textAlign:'center',
      marginTop:'0%',
      zIndex:-1,
    },
    lowBlob:{
      resizeMode:'contain'
    }
})