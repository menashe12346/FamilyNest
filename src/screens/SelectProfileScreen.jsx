import React, { useState, useRef  , useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { ProfilePictureSelector } from '../components/LogSignCmpnts';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CreateNewProfile, getNewProfileID , getProfileById ,getProfileAge} from '../utils/ProfileUtils';
import avatarImages from '../utils/AvatarsUtils';

import { useDispatch, useSelector } from 'react-redux';
import {setReduxProfiles} from '../Redux/userSlice';
import { setSelectedProfileId } from '../Redux/selectedProfileSlice';
import { uploadUserData } from '../utils/UploadData';
import { setUser} from '../Redux/userSlice';
import { BackgroundImage } from '@rneui/base';
import supabase, { uploadImage,getImageUrl } from '../../supabaseCleint';

const avatars = [require('../assets/avatars/avatar_1.png')];

const SelectProfileScreen = ({navigation}) => {

  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector((state) => state.selectedProfile.selectedProfileId);//
  const dispatch = useDispatch();
  console.log('User logged (SelectProfileScreen) :', JSON.stringify(user,null,1));

  const [parental, setParental] = useState((selectedUser)?
    getProfileById(user,selectedUser).role === 'parent' : true);

  const [profiles,setProfiles] = useState(user.profiles)
  const [newProfileName, setNewProfileName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newProfileGender, setNewProfileGender] = useState('');
  const [newProfileCode, setNewProfileCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [role, setRole] = useState('parent'); // תפקיד: Child 
  const [addingProfile, setAddingProfile] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [imageID, setImageID] = useState(1);
  const [imageURI, setImageURI] = useState('');
  const minimumDate = new Date(1900, 0, 1); // January 1, 1900
  const maximumDate = new Date(); // Current date (to prevent future selection)

  console.table(user.profiles)

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openProfileModal = () => {
    setAddingProfile(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeProfileModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setAddingProfile(false));
  };

  const handleAddProfile = async () => {
    console.log('Adding profile...');
    if (
      newProfileName.trim() !== '' &&
      (imageURI || imageID) &&
      birthDate &&
      newProfileGender &&
      newProfileCode.length === 4 &&
      role !== ''
    ) {
      const id = getNewProfileID({profiles: user.profiles})
      let uploadedImageURI = ''
      if(!imageID){
        uploadedImageURI = 'https://uobdeuywixmstdrxugmh.supabase.co/storage/v1/object/public/ProfilePictures/'+user.uid.slice(0,10)+newProfileName+'.jpeg'
        await uploadImage(imageURI.uri,user.uid.slice(0,10)+newProfileName)
        console.log('IMAGE URI example',imageURI)
        setImageID(0)
      }

      const newProfile = CreateNewProfile({
        id,
        role,
        gender: newProfileGender,
        name: newProfileName,
        birth_day: birthDate,
        avatarURI: uploadedImageURI,
        passkey: newProfileCode,
        imageID,
      });
      
     
      console.log('New profile created:', newProfile);
      const updatedProfiles = [...profiles, newProfile];
      dispatch(setReduxProfiles(updatedProfiles));

      setProfiles(updatedProfiles);
      console.log('user.uid',user.uid)
      uploadUserData(user.uid, { profiles: updatedProfiles });

      setNewProfileName('');
      setBirthDate(new Date());
      setNewProfileGender('');
      setNewProfileCode('');
      setSelectedAvatar(null);
      setRole('parent');
      closeProfileModal();
    } else {
      Alert.alert('Error', 'Please fill all fields, including selecting a role.');
    }
  };
  const handleDeleteProfile = (profileId) => {
    Alert.alert("Delete Profile", "Are you sure you want to delete this profile?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
          setProfiles(updatedProfiles);
          dispatch(setReduxProfiles(updatedProfiles));
          uploadUserData(user.uid, { profiles: updatedProfiles });
        },
      },
    ]);
  };
  

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSelectProfile = (id) => () => {
    dispatch(setSelectedProfileId(id));
    console.log('Selected profile ID:', selectedUser);
    navigation.navigate('TabNavigator',{screen:'Home'});
  }



  return (
    <BackgroundImage source={require('../assets/backgrounds/pattern_3.png')}
    resizeMode='cover'
    style={styles.container}
    imageStyle={{ opacity: 0.25 }} // Adjust opacity here
    >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={[styles.title,{marginTop:20}]}>Hello {user.familyName} family!</Text>
      <Text style={[styles.regularText,{marginTop:10}]}>Login to your profile:</Text>
      <FlatList
        numColumns={2}
        data={profiles}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
    
          const profileImage = (item.imageID)? avatarImages[item.imageID] : {uri: item.avatarURI}
          return (
          <TouchableOpacity onPress={handleSelectProfile(item.id)} style={[styles.profileContainer ,
           {borderWidth:4,
           borderStyle: item.role==='child'? 'dashed':'solid', 
           borderColor: item.gender === 'male' ? '#007BFF' : '#FF69B4'}]}>
            <View style={styles.avatarWrapper}>
              <Image source={profileImage} style={styles.profileImage} />
            </View>
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileName}>{getProfileAge(item.birth_day)}</Text>
          </TouchableOpacity>
        )}}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      {parental && <TouchableOpacity onPress={openProfileModal} style={styles.addProfileButton}>
        <Text style={styles.addProfileButtonText}>Add Profile</Text>
      </TouchableOpacity>}
      {addingProfile && (
        <Animated.View style={[styles.addProfileContainer, { opacity: fadeAnim }]}>
          <Text style={styles.subtitle}>Select Avatar:</Text>
          <ProfilePictureSelector
            imageID={imageID}
            setImageID={setImageID}
            imageURI={imageURI}
            setImageURI={setImageURI}
          />
          <TextInput
            value={newProfileName}
            onChangeText={setNewProfileName}
            placeholder="Enter profile name"
            placeholderTextColor="#AAA"
            style={styles.input}
          />
          <TouchableOpacity
  onPress={() => setShowDatePicker(true)}
  style={[styles.input, styles.dateInput]}
>
  <Text style={styles.dateInputText}>
    {`Birth Date: ${birthDate.toISOString().split('T')[0]}`}
  </Text>
</TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={birthDate}
    mode="date"
    display="default"
    minimumDate={minimumDate} // Earliest selectable date
    maximumDate={maximumDate} // Latest selectable date
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) setBirthDate(selectedDate);
    }}
  />
)}
<View style={styles.roleSelectionContainer}>
  <View style={styles.roleCheckbox}>
    <BouncyCheckbox
      size={25}
      fillColor="#9EDF9C"
      unfillColor="#E4F1F4"
      
      onPress={(isChecked) => handleRoleSelect(isChecked ? 'child' : 'parent')}
      iconStyle={{ borderColor: '#9EDF9C' }}
      innerIconStyle={{ borderWidth: 2 }}
    />
    <Text style={styles.checkboxLabel}>Child</Text>
  </View>
</View>
<View style={styles.genderContainer}>
  <TouchableOpacity
    style={[
      styles.genderButton,
      newProfileGender === 'Male' && styles.selectedGenderButton,
    ]}
    onPress={() => setNewProfileGender('male')}
  >
    <Icon name="male" size={16} color="#007BFF" style={styles.genderIcon} />
    <Text style={styles.genderButtonText}>Male</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[
      styles.genderButton,
      newProfileGender === 'Female' && styles.selectedGenderButton,
    ]}
    onPress={() => setNewProfileGender('female')}
  >
    <Icon name="female" size={16} color="#FF69B4" style={styles.genderIcon} />
    <Text style={styles.genderButtonText}>Female</Text>
  </TouchableOpacity>
</View>
          <TextInput
            value={newProfileCode}
            onChangeText={setNewProfileCode}
            placeholder="Enter a 4-digit code"
            placeholderTextColor="#AAA"
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={!isCodeVisible}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAddProfile} style={styles.saveProfileButton}>
            <Text style={styles.saveProfileButtonText}>Save Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeProfileModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

    </KeyboardAvoidingView>
    </BackgroundImage>
  );
};
export default SelectProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #F0F8FF, #F9FAFB)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#542F2F',
    fontFamily: 'Fredoka-Bold'
  },regularText:{
    fontSize: 22,
    color: '#542F2F',
    fontFamily: 'Fredoka-Regular'
  },
  flatListContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop:45,
    alignContent:'center'
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: 110,
    height: 160,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#542F2F',
    textAlign: 'center',
  },
  selectButton: {
    marginTop: 5,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addProfileButton: {
    backgroundColor: '#542F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: '0%',
    marginBottom:'5%'
  },
  addProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addProfileContainer: {
    width:300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    position: 'absolute',
    alignItems: 'center', // מרכז את התוכן
  },
  
  checkboxContainer: {
    marginVertical: 10,
    alignSelf: 'flex-start',
    width: '100%',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#542F2F', // צבע נעים לעין
    marginLeft: -360, // רווח בין ה-Checkbox לטקסט
  },
  saveProfileButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  
  saveProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#542F2F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '80%',
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#F9FAFB',
  },
  selectedGenderButton: {
    backgroundColor: '#AEDFF7',
    borderColor: '#007BFF',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20, // רווח נוסף לפני הכפתור
    backgroundColor: '#FFF',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  dateButtonText: {
    color: '#AAA',
    fontSize: 16,
  },
  roleSelectionContainer: {
    flexDirection: 'column',
    justifyContent: 'center', // מרכז את כל התוכן
    alignItems: 'flex-start', // מוודא שהטקסט והצ'קבוקס מיושרים
    marginTop: 10,
  },
  roleCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // מוודא שהטקסט מיושר עם ה-checkbox
    marginHorizontal: 5,
    marginBottom: 10, // רווח בין השורה לטקסט הבא
  },
  avatarImage: {
    width: 80, // Ensures consistent width
    height: 80, // Ensures consistent height
    borderRadius: 40, // Keeps it circular
    resizeMode: 'contain', // Adjusts image scaling
    marginHorizontal: 10, // Adds spacing between avatars
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5, // Optional padding
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  selectedAvatar: {
    borderColor: '#007BFF',
  },
  avatarsList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  visibilityToggle: {
    marginLeft: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#542F2F',
    fontWeight: 'bold',
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  genderIcon: {
    marginRight: 5, // רווח בין האייקון לטקסט
  },
  codeModal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#542F2F',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
  },separator:{
    marginVertical: '5%', // Add vertical gap
  },
  deleteButton: {
    position: 'absolute',
    top: 0, // מיקום למעלה
    left: 0, // מיקום שמאלה
    backgroundColor: '#FF4D4F',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10, // וודא עדיפות תצוגה
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});


