import { View, Text ,Modal ,StyleSheet ,TouchableOpacity,Button,Image} from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';
/**
 * props: visible: boolean , setVisible function, uri: imageUri , setUri: function to set the Image 
 */
export const AvatarPickerModal = ({modalVisible, setModalVisible, imageUri , setImageUri , style}) =>  {

    const handleSubmit=()=>{
      if(!imageUri){
        console.log('selected null image')
      }else{
        console.log('image selected:',imageUri)
      }
      setModalVisible(false);
    }
  
    return (<><View style={[styles.selectAvatar, style]}>
      <TouchableOpacity onPress={()=>{setModalVisible(true)}}><Avatar
        size={'xlarge'}
        rounded={true}
        source={require('../assets/avatars/girl_signup2.png')} />
      </TouchableOpacity>
    </View><Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}>
        <View style={styles.modalStyle}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200, marginTop: 20 }} />
          )}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </Modal></>
    );
  };

  const styles = StyleSheet.create({
    selectAvatar:{
      alignContent:'center',
      alignItems:'center'
    },modalStyle:{
      marginTop:'15%',
      height:'50%',
      width:'90%',
      alignSelf:'center', 
      justifyContent: 'center',
       alignItems: 'center',
       backgroundColor:'#A0F1FF',
       borderRadius:20,
       elevation:10

    }
  })