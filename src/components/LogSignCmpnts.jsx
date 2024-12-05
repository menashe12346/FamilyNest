import React ,{useState}from 'react';
import { View, Text, TextInput , TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome , AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { calculateFontSize } from '../utils/FontUtils';
import { Dropdown } from 'react-native-element-dropdown';
import { Avatar } from '@rneui/themed';

const gender_data = [
  {label: 'Male', value: '0',icon: "male"},
  {label: 'Female', value: '1',icon: "female"}
];



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


export const UserFamilyComponent = ({ Familyname, setFamilyName, userName, setUserName }) => (
  <View style={styles.ufComponent}>
    <View style={styles.familyNameComponent}>
      <TextInput
        style={styles.inputComponent}
        placeholder="Family Name"
        value={Familyname} 
        onChangeText={(text) => setFamilyName(text)}
      />
    </View>
    <View style={styles.userNameComponent}>
      <TextInput
        style={styles.inputComponent}
        placeholder="User name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
    </View>
  </View>
);

export const EmailComponent = ({ email, setEmail, placeholder }) => (
  <View style={styles.emailContainer}>
    <FontAwesome name="user" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
    <TextInput
      style={styles.inputComponent}
      placeholder={placeholder}
      value={email}
      onChangeText={(text) => setEmail(text)}
    />
  </View>
);


export const PasswordsComponent = ({ password, setPassword, confirmPassword, setConfirmPassword}) => (
  <View style={[styles.passwordsContainer]}>
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Enter password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
    </View>
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Re-Enter password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
    </View>
  </View>
);


export const GenderNameBDay= ({})=>{
  const [gender, setGender]= useState('1');
  const [isFocus, setIsFocus]= useState(false);
  const [date , setDate]=useState(new Date());
  const [open , setOpen]=useState(false);
  

  return <View style={styles.genNamBDay}>
          <View style={styles.dropdownContainer}>
            <Dropdown
            style={[styles.dropdown,isFocus && {borderColor:'blue'}]}
            selectedTextStyle={styles.selectedTextStyle}
            data={gender_data}
            labelField={"label"}
            valueField={"value"}
            onFocus={()=> setIsFocus(true)}
            onBlur={()=>setIsFocus(false)}
            placeholder='Gender'
            value={gender}
            search={false}
            onChange={genderItem=>{
              setGender(genderItem.value);
              setIsFocus(false);
            }}
            renderLeftIcon={()=>{
              const selectedGender =gender_data.find((genderItem)=> genderItem.value===gender);
              const iconName = selectedGender ? selectedGender.icon : ""
              const iconColor = iconName==="female" ? "#c90076":"#2986cc"
              console.log(gender.value);
              return (<FontAwesome
                name={iconName}
                size={20}
                color={iconColor}
              />);
            }}
            />
          </View>
          <View style={styles.firstNameContainer}>
            <TextInput style={styles.inputComponent}
              placeholder="First name"
            />
          </View>
        </View>
};


export const SelectAvatar= ({onPressFunc,style})=>{
  return <View style={[styles.selectAvatar,style]}>
    <TouchableOpacity onPress={onPressFunc}><Avatar
    size={'xlarge'}
    rounded={true}
    source={require('../assets/avatars/girl_signup2.png')}
    />
    </TouchableOpacity>
  </View>
}
  
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
      textInput: {
        fontSize: calculateFontSize(18),
        flex: 1,
        marginLeft: '1%',
        fontFamily:'Fredoka-Regular',
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
      },emailContainer:{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        marginTop:'2%',
        width:'80%',
        alignSelf:'center',
        alignItems:'center',
        elevation:10,
        borderRadius: 18,
    },inputIcon: {
        marginLeft: '4%',
        alignSelf: "baseline",
        paddingTop:'3%'
    },passwordsContainer:{
      flexDirection:'column',
      justifyContent:'center',
    },inputComponent:{
      fontSize:calculateFontSize(14),
      marginStart:'2%',
      fontFamily:'Fredoka-Regular',
      justifyContent:'center'
    },ufComponent:{
      flexDirection:'row',
      justifyContent:'center',
      //marginTop:'2%'
    },familyNameComponent:{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        width:'35%',
        marginStart:'0%',
        elevation:10,
        borderRadius: 18,
    },userNameComponent:{
        backgroundColor: "#FFFFFF",
        width:'42%',
        flexDirection: "row",
        marginStart:'2%',
        elevation:10,
        borderRadius: 18,
    },dropdownContainer:{
      backgroundColor:'#FFFFFF',
      borderRadius:20,
      width:'22%'
    },selectedTextStyle:{
      fontSize:calculateFontSize(12),
      flexDirection:'row',
      textAlign:'center',
      fontFamily:'Fredoka-Regular'
    },dropdown:{
      backgroundColor:'#FFFFFF',
      height: "90%",
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },firstNameContainer:{
      backgroundColor:"#FFFFFF",
      elevation:10,
      borderRadius:18,
      height:'90%',
      width:'30%',
      marginStart:"3%",
    },genNamBDay:{
      alignSelf:'center',
      alignItems:'center',
      flexDirection:'row',
      flex:1,
      height: 45,//!!precentage bug
    },selectAvatar:{
      alignContent:'center',
      alignItems:'center'
    }
  });