import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet , TextInput ,Dimensions, TouchableOpacity } from 'react-native';
import { calculateFontSize } from '../utils/FontUtils';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Set_family_name, Set_user_username , Set_user_age, Set_user_picture } from '../Redux/counterSlice';
import { firebase } from '../../firebase';
import { PasswordsComponent,UserFamilyComponent,EmailComponent,GenderNameBDay } from '../components/LogSignCmpnts';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const { width } = Dimensions.get('window');

const signUp = ({email, password}) => {
  if (email !== '' && password !== '') {
    console.log('Attempting to sign up...');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        console.log('User created successfully (UID):', user);
        handleSignUp();
      })
      .catch((error) => {
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          console.log('Password is too weak!');
        } else {
          console.error('An unexpected error occurred:', error);
        }
      });
  } else {
    console.log('Username and password cannot be empty');
  }
};

const handleSignUp = () => {
  // Navigate to the NewScreen when login is pressed
  navigation.navigate('Home', {
    items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`), // Passing example items
  });
};

// Example components
const HeaderComponent = ({}) => (
  <View style={styles.header}>
    <Text style={styles.textHead}>Create your <Text style={styles.brandText}>FamilyNest</Text> account!</Text>
  </View>
);

const PersonalDetailsText = ({}) => (
  <View>
    <Text style={styles.stepText}>Account Information:</Text>
  </View>
);

const CreatorStep = ({ }) => (
  <View>
    <Text style={styles.stepText}>Create your profile:</Text>
  </View>
);

const PartnerStep = ({onCheckboxChange}) => {
  const [isChecked, setIsChecked] = useState(false); // Define state

  const handlePress = (isChecked) => {
    setIsChecked(!isChecked); // Toggle state
    console.log(isChecked);
    onCheckboxChange(isChecked);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.stepText}>Send partner invitation:</Text>
      <BouncyCheckbox
        size={calculateFontSize(18)}
        fillColor="#9EDF9C"
        unFillColor="#E4F1F4"
        text=""
        iconStyle={{ borderColor: "#9EDF9C" }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={(isChecked) => handlePress(isChecked)} // Correct onPress
      />
    </View>
  );
};

const SignUpButtonComponent = ({ onSignUp }) => (
  <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
    <Text style={styles.signUpText}>Sign Up</Text>
  </TouchableOpacity>
);






// Main component
export default function App() {
  const [Familyname, setFamilyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState(null);
  const [sendPartnerInvitation,setShowPartnerInvitation]=useState(false);


  // Flat List dataset
const data = [
  { id: '1', type: 'header'},
  { id: '2', type: 'personal-step'},
  { id: '3', type: 'user-family'},
  { id: '4', type: 'email-address',},
  { id: '5', type: 'passwords',},
  // TODO phone number
  { id: '6', type: 'creator-step'},
  { id: '7', type: 'creator-profile'},
  { id: '8', type: 'gender-name-bday'},
  { id: '9', type: 'partner-step'},
  ...(sendPartnerInvitation ? [{ id: '10', type: 'partner-invite'}]:[]),
];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <HeaderComponent />;
      case 'personal-step':
        return <PersonalDetailsText />;
      case 'user-family':
        return (
          <UserFamilyComponent
            Familyname={Familyname}
            setFamilyName={setFamilyName}
            userName={userName}
            setUserName={setUserName}
          />
        );
      case 'email-address':
        return <EmailComponent email={email} setEmail={setEmail} placeholder={"Email-address"}/>;
      case 'passwords':
        return (
          <PasswordsComponent
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          />
        );
        case 'creator-step':
          return <CreatorStep />
        case 'creator-profile':
          return <GenderNameBDay />
        case 'partner-step':
          return <PartnerStep onCheckboxChange={setShowPartnerInvitation}/>
        case 'partner-invite':
          return <EmailComponent placeholder={"Your partner email address"}/>
        case 'sign-up-button':
          return <SignUpButtonComponent onSignUp={() => signUp(email, password)} />;
      default:
        return null;
    }
  };

  return (
    <FlatList
    style={{ backgroundColor: '#E4F1F4' }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  header: { padding: 16},
  headerText: { fontWeight: 'bold', fontSize: 18 },
  separator: { height: 1, backgroundColor: '#ccc' },
  textHead: {
    textAlign: 'center',
    marginTop:5,
    fontSize: calculateFontSize(18),
    fontWeight: 'bold',
  },brandText:{
    color:"#B85455",
  },stepText:{
    textAlign: 'left',
    paddingStart:'5%',
    fontWeight:'600',
    marginBottom:'1%',
    fontSize: calculateFontSize(15),
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
  },inputComponent:{
      fontSize:calculateFontSize(14),
      marginStart:'2%'
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
      paddingTop:'7'
  },passwordsContainer:{
    flexDirection:'column',
    justifyContent:'center',
  }
});
