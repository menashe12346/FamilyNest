import { View, Image, Modal, StyleSheet, TouchableOpacity , Text ,Alert} from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { FlatList } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';



const AvatarSelectModal = ({imageURI, setImageURI ,showModal,setShowModal}) => {
    const [CameraPhotoURI, setCameraPhoto] = React.useState(null)

    const data = [
        { id: '1',type: 'camera', uri:  require('../assets/avatars/girl_signup2.png')},
        { id: '2',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        { id: '3',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        { id: '4',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        { id: '5',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        { id: '6',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        { id: '7',type: 'image', uri:  require('../assets/avatars/girl_signup.png') },
        // Add more avatars as needed
      ];

      const openCamera = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
          return;
        }
    
        // Launch the camera
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
          saveToPhotos: true,
        });
    
        if (!result.canceled) {
          // Save the image URI
          setCameraPhoto(result.assets[0].uri);
          console.log('Captured Image URI:', CameraPhotoURI);
          console.log('Result:', {uri: CameraPhotoURI});
          setImageURI({uri: CameraPhotoURI})
        }
      };

      const renderItem = ({ item }) => {
        console.log('Image URI:', item.uri);
        switch(item.type){
          case 'image':
            return <TouchableOpacity onPress={() => setImageURI(item.uri)}><Image source={item.uri} style={styles.avatarImage} /></TouchableOpacity>;
          case 'camera':
            return <TouchableOpacity onPress={openCamera}><Image source={CameraPhotoURI? {uri: CameraPhotoURI}: require('../assets/avatars/girl_signup2.png')} style={styles.cameraImage}/></TouchableOpacity>
        }
      };

//TODO add chosen one show add camera sensor or gallery , adjust styles
    console.log("Show Modal:",showModal)
    return (
        <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
                <Image style={styles.chosenAvatarImage} source={imageURI}/>
              <Text style={styles.modalTitle}>Select Avatar</Text>
    
              <FlatList
                //horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3} // Three avatars per row
                contentContainerStyle={styles.avatarList}
              />
    
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {setShowModal(false);}} // Close the modal after selection
              >
                <Text style={styles.submitButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        width: '90%',
        height:"55%",
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontFamily:'Fredoka-Bold',
        marginBottom: 20,
      },
      avatarList: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatarItem: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 50,
        padding: 5,
      },
      avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: 'cover',
      },
      submitButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'blue',
        borderRadius: 5,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
      },chosenAvatarImage:{
        width: 140,
        height: 140,
      },cameraImage:{
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: 'cover',
      }
    });
    
    export default AvatarSelectModal;