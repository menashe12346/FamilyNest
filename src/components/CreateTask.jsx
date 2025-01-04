import { Modal,View, Text ,TextInput ,StyleSheet ,Image} from 'react-native'
import React from 'react'
import avatarImages from '../utils/AvatarsUtils'

const CreateTask = ({showModal,setShowModal}) => {
  return (
    <Modal visible={showModal} transparent={true} animationType='slide'>
        <View style={styles.modalContent}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput placeholder="Title" style={styles.taskTitle}/>
                <View style={{alignItems:'center'}}>
                    <Text>Created by</Text>
                    <View style={styles.roundedImage}>
                        <Image source={avatarImages[1]} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
                    </View>
                </View>
            </View>
            <Text onPress={()=>setShowModal(false)}>CreateTask</Text>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContent: {
      width: '85%',
      height:"55%",
      padding: 20,
      backgroundColor: '#0FFFF0',
      borderRadius: 10,
      alignSelf: 'center',
      birderColor: 'black',
      borderWidth: 3,
      marginTop: '20%',
      flexDirection: 'column',
    },taskTitle:{
        backgroundColor:'white',
        width:'75%',
        height:'90%',
        marginTop:'2%',
        borderRadius:10,
        elevation:10,
    },roundedImage:{
        width: 40, // Increased width
        height: 40, // Increased height
        borderRadius: 20, // Half of the width/height to make it a perfect circle
        overflow: "hidden", // Ensure the image is contained within the circle
        backgroundColor:'transparent',
    }
})


export default CreateTask