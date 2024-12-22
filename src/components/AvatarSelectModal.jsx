import { View, Image, Modal, StyleSheet, TouchableOpacity , Text} from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { FlatList } from 'react-native-gesture-handler'

const AvatarSelectModal = ({imageURI, setImageURI ,showModal,setShowModal}) => {
    const avatars = [
        { id: '1', uri:  require('../assets/avatars/boy_signup.png') },
        { id: '2', uri:  require('../assets/avatars/boy_signup.png') },
        { id: '3', uri:  require('../assets/avatars/boy_signup.png') },
        { id: '4', uri:  require('../assets/avatars/boy_signup.png') },
        { id: '5', uri:  require('../assets/avatars/boy_signup.png') },
        { id: '6', uri:  require('../assets/avatars/boy_signup.png') },
        // Add more avatars as needed
      ];

      const renderItem = ({ item }) => {
        return <Image source={item.uri} style={styles.avatarImage} />
        ;
      };

//TODO add chosen one show add camera sensor or gallery , adjust styles
    console.log("Show Modal:",showModal)
    return (
        <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
                <Image style={styles.chosenAvatarImage}source={require('../assets/avatars/boy_signup.png')}/>
              <Text style={styles.modalTitle}>Select Avatar</Text>
    
              <FlatList
                //horizontal={true}
                data={avatars}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3} // Three avatars per row
                contentContainerStyle={styles.avatarList}
              />
    
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setShowModal(false)} // Close the modal after selection
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
      }
    });
    
    export default AvatarSelectModal;