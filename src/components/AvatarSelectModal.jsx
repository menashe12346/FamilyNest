import { View, Image, Modal, StyleSheet, TouchableOpacity , Text ,Alert} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { Button } from '@rneui/base'
import { FlatList } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';



const AvatarSelectModal = ({imageURI, setImageURI ,imageID, setImageID,showModal,setShowModal}) => {
    const [CameraPhotoURI, setCameraPhoto] = useState(null)

    const data = [
      { id: '0', type: 'camera', uri: require('../assets/images/camera.png') }, // Camera item
      { id: '1', type: 'image', uri: require('../assets/avatars/avatar_1.png') },
      { id: '2', type: 'image', uri: require('../assets/avatars/avatar_2.png') },
      { id: '3', type: 'image', uri: require('../assets/avatars/avatar_3.png') },
      { id: '4', type: 'image', uri: require('../assets/avatars/avatar_4.png') },
      { id: '5', type: 'image', uri: require('../assets/avatars/avatar_5.png') },
      { id: '6', type: 'image', uri: require('../assets/avatars/avatar_6.png') },
      { id: '7', type: 'image', uri: require('../assets/avatars/avatar_7.png') },
      { id: '8', type: 'image', uri: require('../assets/avatars/avatar_8.png') },
      { id: '9', type: 'image', uri: require('../assets/avatars/avatar_9.png') },
      { id: '10', type: 'image', uri: require('../assets/avatars/avatar_10.png') },
      { id: '11', type: 'image', uri: require('../assets/avatars/avatar_11.png') },
      { id: '12', type: 'image', uri: require('../assets/avatars/avatar_12.png') },
      { id: '13', type: 'image', uri: require('../assets/avatars/avatar_13.png') },
      { id: '14', type: 'image', uri: require('../assets/avatars/avatar_14.png') },
      { id: '15', type: 'image', uri: require('../assets/avatars/avatar_15.png') },
      { id: '16', type: 'image', uri: require('../assets/avatars/avatar_16.png') },
      { id: '17', type: 'image', uri: require('../assets/avatars/avatar_17.png') },
      { id: '18', type: 'image', uri: require('../assets/avatars/avatar_18.png') },
      { id: '19', type: 'image', uri: require('../assets/avatars/avatar_19.png') },
      { id: '20', type: 'image', uri: require('../assets/avatars/avatar_20.png') },
      { id: '21', type: 'image', uri: require('../assets/avatars/avatar_21.png') },
      { id: '22', type: 'image', uri: require('../assets/avatars/avatar_22.png') },
      { id: '23', type: 'image', uri: require('../assets/avatars/avatar_23.png') },
      { id: '24', type: 'image', uri: require('../assets/avatars/avatar_24.png') },
      { id: '25', type: 'image', uri: require('../assets/avatars/avatar_25.png') },
      { id: '26', type: 'image', uri: require('../assets/avatars/avatar_26.png') },
      { id: '27', type: 'image', uri: require('../assets/avatars/avatar_27.png') },
      { id: '28', type: 'image', uri: require('../assets/avatars/avatar_28.png') },
      { id: '29', type: 'image', uri: require('../assets/avatars/avatar_29.png') },
      { id: '30', type: 'image', uri: require('../assets/avatars/avatar_30.png') },
      { id: '31', type: 'image', uri: require('../assets/avatars/avatar_31.png') },
      { id: '32', type: 'image', uri: require('../assets/avatars/avatar_32.png') },
      { id: '33', type: 'image', uri: require('../assets/avatars/avatar_33.png') },
      { id: '34', type: 'image', uri: require('../assets/avatars/avatar_34.png') },
      { id: '35', type: 'image', uri: require('../assets/avatars/avatar_35.png') },
      { id: '36', type: 'image', uri: require('../assets/avatars/avatar_36.png') },
      { id: '37', type: 'image', uri: require('../assets/avatars/avatar_37.png') },
      { id: '38', type: 'image', uri: require('../assets/avatars/avatar_38.png') },
      { id: '39', type: 'image', uri: require('../assets/avatars/avatar_39.png') },
      { id: '40', type: 'image', uri: require('../assets/avatars/avatar_40.png') },
      { id: '41', type: 'image', uri: require('../assets/avatars/avatar_41.png') },

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
          console.log(result.assets[0].uri)
          console.log('Captured Image URI:', CameraPhotoURI);
          console.log('Result:', {uri: CameraPhotoURI});
          setImageURI({uri: CameraPhotoURI})
          setImageID(0)
        }
      };

      const renderItem = ({ item }) => {
        switch(item.type){
          case 'image':
            return <TouchableOpacity onPress={() => {setImageURI(item.uri)
              setImageID(item.id)
              console.log("Selected Image ID:",item.id)
            }}><Image source={item.uri} style={styles.avatarImage} /></TouchableOpacity>;
          case 'camera':
            return <TouchableOpacity onPress={openCamera}><Image source={CameraPhotoURI? {uri: CameraPhotoURI}: require('../assets/images/camera.png')} style={styles.cameraImage}/></TouchableOpacity>
        }
      };

      useEffect(() => {
        if (CameraPhotoURI) {
          console.log('Captured Image URI:', CameraPhotoURI);
          console.log('Result:', { uri: CameraPhotoURI });
          setImageURI({uri: CameraPhotoURI})
          setImageID(0)
          
        }
      }, [CameraPhotoURI]);  // This effect runs every time cameraPhoto changes

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