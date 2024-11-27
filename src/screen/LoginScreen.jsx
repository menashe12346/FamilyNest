import { StyleSheet, Text, View ,Image, TextInput} from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const LoginScreen = () => {
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
        <TextInput style={styles.textInput} placeholder='password'/>
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
    }
})