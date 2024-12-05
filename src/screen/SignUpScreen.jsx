import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet , TextInput ,Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { calculateFontSize } from '../utils/FontUtils';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { connect } from 'react-redux';
import { Set_family_name, Set_user_username , Set_user_age, Set_user_picture } from '../Redux/counterSlice';
import { firebase } from '../../firebase';

const { width } = Dimensions.get('window');

const signUp = ({email, password, navigation}) => {
  if (email !== '' && password !== '') {
    console.log('Attempting to sign up...');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        console.log('User created successfully (UID):', user);
        navigation.navigate('Home');
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

const PartnerStep = ({ }) => (
  <View>
    <Text style={styles.stepText}>Add your partner:</Text>
  </View>
);

const UserFamilyComponent = ({ Familyname, setFamilyName, userName, setUserName }) => (
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

const EmailComponent = ({ email, setEmail }) => (
  <View style={styles.emailContainer}>
    <FontAwesome name="user" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
    <TextInput
      style={styles.inputComponent}
      placeholder="Enter your email address"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />
  </View>
);


const PasswordsComponent = ({ password, setPassword, confirmPassword, setConfirmPassword }) => (
  <View style={styles.passwordsContainer}>
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

const CarouselImages =({})=>(
  <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
);

const SignUpButtonComponent = ({ onSignUp }) => (
  <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
    <Text style={styles.signUpText}>Sign Up</Text>
  </TouchableOpacity>
);



// Data
const data = [
  { id: '1', type: 'header'},
  { id: '2', type: 'personal-step'},
  { id: '3', type: 'user-family'},
  { id: '4', type: 'email-address',},
  { id: '5', type: 'passwords',},
  // TODO phone number
  { id: '6', type: 'creator-step'},
  { id: '7', type: 'creator-profile'},
  { id: '8', type: 'partner-step'},
  { id: '9', type: 'partner-profile'},
  { id: '10', type: 'sign-up-button' }, 
];

// Main component
export default function App() {

  const navigation = useNavigation();

  const [Familyname, setFamilyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState(null);

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
        return <EmailComponent email={email} setEmail={setEmail} />;
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
          return <CarouselImages />
        case 'partner-step':
          return <PartnerStep />
        //case 'partner-profile':
        //return
        case 'sign-up-button':
          return <SignUpButtonComponent onSignUp={() => signUp({email, password, navigation})} />;
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
  },
  signUpButton: {
    backgroundColor: '#B85455',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
