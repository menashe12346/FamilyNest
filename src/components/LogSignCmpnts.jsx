import React ,{useState}from 'react';
import { View, Text, TextInput , TouchableOpacity, StyleSheet , Image, KeyboardAvoidingView } from 'react-native';
import { FontAwesome , AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { calculateFontSize } from '../utils/FontUtils';
import { Dropdown } from 'react-native-element-dropdown';
import { Avatar } from '@rneui/themed';
import DateTimePicker from "@react-native-community/datetimepicker"
import AvatarSelectModal from './AvatarSelectModal';

const gender_data = [
  {label: 'Male', value: '0',icon: "male"},
  {label: 'Female', value: '1',icon: "female"}
];



export const TextInputField = ({ placeholder, iconName, secureTextEntry, value, onChangeText, style , inputMode }) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={[styles.inputContainer, style]}>
      <FontAwesome name={iconName} size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
      />
    </KeyboardAvoidingView>
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
      maxLength={256}
    />
  </View>
);


export const PasswordsComponent = ({ password, setPassword, confirmPassword, setConfirmPassword}) => (
  <View style={[styles.passwordsContainer]}>
    {(password && !(password===confirmPassword))? <Text style={styles.passwordRedMessage}>Passwords not matching</Text>:<Text style={styles.passwordText}>Create Password</Text>}
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Enter password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        maxLength={128}
      />
    </View>
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Re-Enter password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) => {
          console.log("Matching password:",text===password)
          setConfirmPassword(text)
        }}
      />
    </View>
  </View>
);


export const GenderNameBDay= ({firstName,setFirstName,gender,setGender,date,setDate})=>{
  const [isFocus, setIsFocus]= useState(false);
  const [showPicker, setShowPicker] = useState(false); 

  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // DD-MM-YYYY format

  const minimumDate = new Date(1900, 0, 1); // January 1, 1900
  const maximumDate = new Date(); // Current date (to prevent future selection)

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate); // Ensure a valid Date object is passed
      setShowPicker(false)
    }
  };
  

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
              value={firstName}
              onChangeText={(firstNameText)=>{setFirstName(firstNameText)}}
              maxLength={32}
            />
          </View>
          <TouchableOpacity style={styles.dateButton} onPress={()=>setShowPicker(true)}>
            <FontAwesome name={'birthday-cake'} size={calculateFontSize(12)}><Text style={styles.dateText}>Birthday</Text></FontAwesome>
            <Text style={styles.date}>{formattedDate}</Text>
          </TouchableOpacity>
            {showPicker && <DateTimePicker label={"Birthday date"}
              mode="date"
              defaultValue={Date()}
              value={date instanceof Date ? date : new Date()}
              display='default'
              onChange={handleChange}
              minimumDate={minimumDate} // Earliest selectable date
              maximumDate={maximumDate} // Latest selectable date
              />
              }
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

export const ProfilePictureSelector=({ imageURI ,setImageURI})=>{
  const [showModal,setShowModal]=useState(false)
  console.log("Image URI:",imageURI)
  return <>{showModal && <AvatarSelectModal imageURI={imageURI} setImageURI={setImageURI} showModal={showModal} setShowModal={setShowModal}/>}<TouchableOpacity style={styles.roundedContainer} onPress={()=>setShowModal(true)} >
            <Image style={styles.roundedImage} source={imageURI? imageURI : require('../assets/avatars/girl_signup.png')}/>
          </TouchableOpacity></>
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
      marginTop:'3%',
      alignSelf:'center',
      alignItems:'center',
      flexDirection:'row',
      flex:1,
      //height: "100%",//!!precentage bug
    },selectAvatar:{
      alignContent:'center',
      alignItems:'center'
    },dateButton:{
      backgroundColor:"#FFFFFF",
      borderColor:"#000",
      elevation:10,
      borderRadius:14,
      marginStart:"3%",
      width:"20%",
      alignSelf:'center',
      flexDirection:'column',
      alignItems:'center',
      alignContent:'center'
    },dateText:{
      calculateFontSize:(12),
      fontFamily:'Fredoka-Regular',
    },roundedContainer:{
      borderRadius: 40,
      alignSelf:'center',
      alignItems:'center',
      height:120,
      width:120,
    },roundedImage:{
      height:"100%",
      width:"100%",
      borderRadius:60,
      resizeMode:'cover'
    },avatarContainer:{
      height:"20",
      width:"20",
    },passwordRedMessage:{
      color: '#D91656',
      fontSize: calculateFontSize(12),
      fontFamily:'Fredoka-Regular',
      marginStart:'10%'
    },passwordText:{
      fontSize: calculateFontSize(12),
      fontFamily:'Fredoka-Regular',
      marginStart:'10%',
      marginTop:'2%'
    }
  });