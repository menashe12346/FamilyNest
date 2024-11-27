import { StyleSheet, Text, View ,Image, TextInput, TouchableOpacity, Animated} from 'react-native'
import React, {useRef} from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

  const navigation = useNavigation();
  const animatedWidth= useRef(new Animated.Value(90)).current;

  
  const handleSignUp= () =>{
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
        <View style={styles.loginBackgrondContainer}>
            <Image source={require("../assets/topHouse.png")} style={styles.backgroundImage}/>
        </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.loginText}>Login to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={28} color={"#9A9A9A"} style={styles.inputIcon}/>
        <TextInput style={styles.textInput} placeholder='Email adress'/>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={28} color={"#9A9A9A"} style={styles.inputIcon}/>
        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry/>
      </View>
      <View style={styles.logInContainer}>
        <Text style={styles.logInText}>Log in</Text>
        <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
        colors={["#E99091","#CD9D9E","#B85455"]} style={styles.linearGradient}
        ><AntDesign name={"arrowright"} size={24} color={"white"} marginHorizontal={30}/> 
        </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignUp}>
      <Text style={styles.footerText}>Don't have an account? 
        <Text style={{textDecorationLine:"underline"}}>Create</Text>
      </Text>
      </TouchableOpacity>
      <View style={styles.blobContainer}>
        <Image source={require("../assets/lowBlob.png")} style={styles.lowBlob}/>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#E4F1F4",
        flex: 1
    },loginBackgrondContainer:{
      height:300,
    },backgroundImage:{
      marginTop:10,
      height:"100%",
      width:"100%"
    },helloContainer:{
    },helloText:{
      textAlign:"center",
      fontSize: 60 ,
      fontWeight: 700,
      color: "#542F2F",
    },loginText:{
      textAlign:"center",
      fontSize: 25,
      fontWeight:500,
      color: "#542F2F",
      marginBottom:10
    },inputContainer:{
      backgroundColor:"#FFFFFF",
      flexDirection:"row",
      borderRadius:20,
      marginHorizontal:40,
      elevation:10,
      marginVertical:10,
    },inputIcon:{
      marginLeft:15,
      alignSelf:"baseline",
      marginTop:15
    },textInput:{
      fontSize:18,
      flex:1,
      marginLeft:10,
    },logInContainer:{
      flexDirection:"row",
      marginTop:30,
      width:"90%",
      justifyContent:"flex-end"
    },logInText:{
      color:"#542F2F",
      fontSize:30,
      fontWeight:"bold",
      textAlign:"center"
    },linearGradient:{
      elevation:10,
      height:45,
      width:90,
      borderRadius:70,
      alignItems:"center",
      justifyContent:"center",
      marginHorizontal:10,
    },footerText:{
      textAlign:"center",
      color:"black",
      fontSize:18,
      marginTop:120
    },blobContainer:{
      position:"relative",
      bottom:0,
      marginRight:100,
      marginTop:30
    },
    lowBlob:{
     height:350,
     width:350,
    }
})