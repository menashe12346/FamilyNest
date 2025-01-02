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
import { CreateNewProfile, getNewProfileID , getProfileById } from '../utils/ProfileUtils';
import avatarImages from '../utils/AvatarsUtils';

import { useDispatch, useSelector } from 'react-redux';
import {setReduxProfiles} from '../Redux/userSlice';
import { setSelectedProfileId } from '../Redux/selectedProfileSlice';
import { uploadUserData } from '../utils/UploadData';
import { setUser} from '../Redux/userSlice';

const avatars = [require('../assets/avatars/avatar_1.png')];

const SelectProfileScreen = () => {

  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector((state) => state.selectedProfile.selectedProfileId);//
  const dispatch = useDispatch();
  console.log('User logged (SelectProfileScreen):', user);

  const [parental, setParental] = useState((selectedUser)?
    getProfileById(user,selectedUser).role === 'parent' : true);
  console.log('Parental:', parental);

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

  const handleAddProfile = () => {
    console.log('Adding profile...');
    if (
      newProfileName.trim() !== '' &&
      imageID &&
      birthDate &&
      newProfileGender &&
      newProfileCode.length === 4 &&
      role !== ''
    ) {
      const id = getNewProfileID({profiles: user.profiles})
      const newProfile = CreateNewProfile({
        id,
        role,
        gender: newProfileGender,
        name: newProfileName,
        birth_day: birthDate,
        avatarURI: selectedAvatar,
        passkey: newProfileCode,
        imageID
      });
      
      console.log('\nNew profile:', newProfile);
      const updatedProfiles = [...profiles, newProfile];
      dispatch(setReduxProfiles(updatedProfiles));

      setProfiles(updatedProfiles);
      console.log('\nProfiles (after update):', updatedProfiles);

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

  const handleRoleSelect = (selectedRole) => {
    console.log('Selected role:', selectedRole);
    setRole(selectedRole);
  };

  const handleSelectProfile = (id) => () => {
    console.log('Selected profile:', id);
    dispatch(setSelectedProfileId(id));
    console.log('Selected profile ID:', selectedUser);
  }




  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Welcome back {user.familyName}!</Text>
      <FlatList
        numColumns={3}
        data={profiles}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleSelectProfile(item.id)} style={[styles.profileContainer , {borderWidth:3,borderColor: item.gender === 'Male' ? '#007BFF' : '#FF69B4'}]}>
            <View style={styles.avatarWrapper}>
              <Image source={avatarImages[item.imageID]} style={styles.profileImage} />
            </View>
            <Text style={styles.profileName}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
    onPress={() => setNewProfileGender('Male')}
  >
    <Icon name="male" size={16} color="#007BFF" style={styles.genderIcon} />
    <Text style={styles.genderButtonText}>Male</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[
      styles.genderButton,
      newProfileGender === 'Female' && styles.selectedGenderButton,
    ]}
    onPress={() => setNewProfileGender('Female')}
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
  );
};
export default SelectProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #F0F8FF, #F9FAFB)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#542F2F',
    marginBottom: 20, 
    fontFamily: 'Fredoka-Bold'
  },
  flatListContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
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
    marginTop: 20,
  },
  addProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addProfileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    position: 'absolute',
    top: '15%', // העלינו את המיקום למרכז המסך
    left: '10%',
    right: '10%',
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
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
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
  },
  genderIcon: {
    marginRight: 5, // רווח בין האייקון לטקסט
  },
  
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  }
});


