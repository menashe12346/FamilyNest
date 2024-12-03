import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputField,GradientButton } from '../components/LogSignCmpnts';
import SelectDropdown from 'react-native-select-dropdown'
import { calculateFontSize } from '../utils/FontUtils';
import Counter from 'react-native-counters';

const SignUpScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
          <View style={styles.headContainer}>
            <Text style={styles.textHead}>Create your <Text style={styles.brandText}>FamilyNest</Text> account</Text>
          </View>
          <View style={styles.nameContainer}>
            <TextInputField style={styles.personalName}
              placeholder="First Name"
              //iconName="male" // or female depends on scrolldown selector
              secureTextEntry={false}/>
              <TextInputField style={styles.personalName}
              placeholder="Last Name"
              secureTextEntry={false}/>
          </View>
          <View style={styles.personalContainer}>
            <TextInputField style={styles.personalDetails}
              placeholder="User name"
              iconName="user"
              secureTextEntry={false}/>
            <TextInputField style={styles.personalDetails}
              placeholder="Email address"
              iconName="envelope-o"
              secureTextEntry={false}/>
            <TextInputField style={styles.personalDetails}
              placeholder="Password"
              iconName="lock"
              secureTextEntry={true}/>
            <TextInputField style={styles.personalDetails}
              placeholder="Re-Enter Password"
              iconName="lock"
              secureTextEntry={true}/>
              <Text style={styles.stepText}>Add family members</Text>
            </View>
            <View style={styles.partnerContainer}>

            </View>
            <View style={styles.kidsContainer}>
              <Image style={styles.kidsImage} 
                source={require('../assets/avatars/boy_signup.png')}/>
                <Image style={styles.kidsImage} 
                source={require('../assets/avatars/girl_signup2.png')}/>
            </View>
            <View style={styles.counterContainer}>
              <Counter start={0}></Counter>
              <Counter start={0}></Counter>
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
    fontSize: calculateFontSize(18),
    fontWeight: 'bold',
  },brandText:{
    color:"#B85455",
  },scrollView: {
    backgroundColor: '#E4F1F4',
  },headContainer:{
    flexDirection:'column'
  },nameContainer:{
    flexDirection:'row',
    alignSelf:'center'
  },personalName:{
    width:"40%",
    height:"90%",
    marginHorizontal:'1%',
  },personalContainer:{
    alignSelf:'center',
    flexDirection:'column'
  },personalDetails:{
    width:"83%",
    height:"18%",
  },stepText:{
    fontSize:calculateFontSize(18),
    fontWeight:'bold',
    alignSelf:'center',
  },kidsContainer:{
   flexDirection:'row',
    height:'50%',
    width:'50%',
    marginTop:'-3%',
    marginHorizontal:'5%',
    alignContent:'center',
    justifyContent:'space-between'
  },kidsImage:{
      height:'85%',
      width:'90%',
      resizeMode:'contain'
  },counterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    width:'70%',
    marginStart:'15%',
    marginTop:'-7%',
  }
});