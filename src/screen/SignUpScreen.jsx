import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputField,GradientButton } from '../components/LogSignCmpnts';
import SelectDropdown from 'react-native-select-dropdown'

const SignUpScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
          <View style={styles.headContainer}>
            <Text style={styles.textHead}>Create FamilyNest account</Text>
          </View>
          <View style={styles.nameContainer}>
            <TextInputField style={styles.personalName}
              placeholder="First Name"
              iconName="male" // or female depends on scrolldown selector
              secureTextEntry={false}/>
              <TextInputField style={styles.personalName}
              placeholder="Last Name"
              secureTextEntry={false}/>
          </View>
          <TextInputField
            placeholder="User name"
            iconName="user"
            secureTextEntry={false}/>
          <TextInputField
            placeholder="Email address"
            iconName="envelope-o"
            secureTextEntry={false}/>
          <TextInputField
            placeholder="Password"
            iconName="lock"
            secureTextEntry={false}/>
          <TextInputField
            placeholder="Re-Enter Password"
            iconName="lock"
            secureTextEntry={false}/>
          <View style={styles.kidsContainer}>
            <Image style={styles.kidsImage} 
            source={require('../assets/avatars/boy_signup.png')}/>
            <Image style={styles.kidsImage} 
            source={require('../assets/avatars/girl_signup2.png')}/>
          </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E4F1F4",
    flex: 1,
  },
  textHead: {
    textAlign: 'center',
    marginTop:5,
    fontSize: 20,
    fontWeight: 'bold',
  },scrollView: {
    backgroundColor: '#E4F1F4',
  },headContainer:{
    flexDirection:'column'
  },nameContainer:{
    flexDirection:'row',
    marginHorizontal:35
  },personalName:{
    width:180,
    height:60,
    marginHorizontal:5,
  },kidsContainer:{
   flexDirection:'row',
    height:200,
    width:200,
    marginHorizontal:10,
  },kidsImage:{
      height:'70%',
      width:'70%',
      resizeMode:'contain'
  }
});