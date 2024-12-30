import React, { useState, useRef } from 'react';
import { Animated, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const avatars = [
  require('../assets/avatars/avatar_1.png'),
];

const SelectProfileScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAge, setNewProfileAge] = useState('');
  const [newProfileGender, setNewProfileGender] = useState('');
  const [newProfileCode, setNewProfileCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [addingProfile, setAddingProfile] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const user = useSelector((state) => state.user.user);

  console.log('User selector:', user);

  // Animation state
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
    if (
      newProfileName.trim() !== '' &&
      selectedAvatar &&
      newProfileAge &&
      newProfileGender &&
      newProfileCode.length === 4
    ) {
      const newProfile = {
        id: Date.now().toString(),
        name: newProfileName,
        age: newProfileAge,
        gender: newProfileGender,
        code: newProfileCode,
        image: selectedAvatar,
      };
      setProfiles([...profiles, newProfile]);
      setNewProfileName('');
      setNewProfileAge('');
      setNewProfileGender('');
      setNewProfileCode('');
      setSelectedAvatar(null);
      closeProfileModal();
    } else {
      alert('Please fill all fields, including a 4-digit code.');
    }
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowCodeModal(true);
  };

  const verifyCode = () => {
    if (selectedProfile && codeInput === selectedProfile.code) {
      Alert.alert('Success', `Welcome, ${selectedProfile.name}!`);
      setShowCodeModal(false);
      setCodeInput('');
    } else {
      Alert.alert('Error', 'Incorrect code. Please try again.');
    }
  };

  const handleDeleteProfile = (profileId) => {
    setProfiles(profiles.filter((profile) => profile.id !== profileId));
  };

  const renderAvatar = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        selectedAvatar === item && styles.selectedAvatar,
      ]}
      onPress={() => setSelectedAvatar(item)}
    >
      <Image source={item} style={styles.avatarImage} />
    </TouchableOpacity>
  );
  

  const handleGenderSelect = (gender) => {
    setNewProfileGender(gender);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Select a Profile</Text>
      <FlatList
        data={profiles}
        renderItem={({ item }) => (
          <View style={styles.profileContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={item.image} style={styles.profileImage} />
              <TouchableOpacity
                onPress={() => handleDeleteProfile(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleProfileSelect(item)}
              style={styles.selectButton}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No profiles available</Text>}
      />
      <TouchableOpacity onPress={openProfileModal} style={styles.addProfileButton}>
        <Text style={styles.addProfileButtonText}>Add Profile</Text>
      </TouchableOpacity>
      {addingProfile && (
        <Animated.View style={[styles.addProfileContainer, { opacity: fadeAnim }]}>
          <Text style={styles.subtitle}>Select Avatar:</Text>
          <FlatList
            data={avatars}
            renderItem={renderAvatar}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.avatarsList}
          />
          <TextInput
            value={newProfileName}
            onChangeText={setNewProfileName}
            placeholder="Enter profile name"
            placeholderTextColor="#AAA"
            style={styles.input}
          />
          <TextInput
            value={newProfileAge}
            onChangeText={setNewProfileAge}
            placeholder="Enter age"
            placeholderTextColor="#AAA"
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                newProfileGender === 'Male' && styles.selectedGenderButton,
              ]}
              onPress={() => handleGenderSelect('Male')}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                newProfileGender === 'Female' && styles.selectedGenderButton,
              ]}
              onPress={() => handleGenderSelect('Female')}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.codeInputContainer}>
            <TextInput
              value={newProfileCode}
              onChangeText={setNewProfileCode}
              placeholder="Enter a 4-digit code"
              placeholderTextColor="#AAA"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={!isCodeVisible}
              style={[styles.input, { flex: 1 }]}
            />
            <TouchableOpacity
              onPress={() => setIsCodeVisible(!isCodeVisible)}
              style={styles.visibilityToggle}
            >
              <Text style={styles.toggleText}>{isCodeVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleAddProfile} style={styles.saveProfileButton}>
            <Text style={styles.saveProfileButtonText}>Save Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeProfileModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {showCodeModal && (
        <View style={styles.codeModal}>
          <Text style={styles.modalTitle}>Enter Access Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 4-digit code"
            keyboardType="numeric"
            maxLength={4}
            value={codeInput}
            onChangeText={setCodeInput}
          />
          <TouchableOpacity onPress={verifyCode} style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCodeModal(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default SelectProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1F4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#542F2F',
    marginBottom: 20,
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
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
  },
  saveProfileButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
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
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
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
  },
});

