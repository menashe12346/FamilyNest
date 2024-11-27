import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.loginBackgrondContainer}>
            <Image source={require("../assets/loginBackground.png")} style={styles.backgroundImage}/>
        </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>FamilyNest</Text>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "F5F5F5",
        flex: 1
    },loginBackgrondContainer:{
      height:300,
    },backgroundImage:{
      height:"100%",
      width:"100%"
    },helloContainer:{
    },helloText:{
      textAlign:"center",
      fontSize: 70,
      fontWeight: 700,
      color: "#262626"
    }

})