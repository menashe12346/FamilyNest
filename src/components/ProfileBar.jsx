import { View, Text ,StyleSheet, Pressable ,Image} from 'react-native'
import React from 'react'
import { calculateFontSize } from '../utils/FontUtils'
import avatarImages from '../utils/AvatarsUtils'
import { isMomDadSonDaughter } from '../utils/ProfileUtils'

const ProfileBar = ({profile}) => {
  return (
    <Pressable style={[styles.pressable,
    {borderWidth:3,
     borderColor: profile.gender? 'blue':'pink'}]} onLongPress={() => console.warn("ProfileBar pressed")}>
      <View style={styles.roundImage}>
        <Image source={avatarImages[profile.imageID]} style={styles.avatarImage} />
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.nameStyle}>{profile.name}</Text>
        <Text style={styles.roleText}>{isMomDadSonDaughter({profile})}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    width: '90%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  nameStyle: {
    fontSize: calculateFontSize(24),
    fontFamily: 'Fredoka-Bold',
  },
  roundImage: {
    marginStart: '2%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Increased width
    height: 60, // Increased height
    borderRadius: 30, // Half of the width/height to make it a perfect circle
    overflow: "hidden", // Ensure the image is contained within the circle
  },
  avatarImage: {
    width: "100%", // Adjust the width to fill the circle
    height: "100%", // Adjust the height to fill the circle
    resizeMode: "cover",
  },profileDetails:{
    flexDirection: 'column',
    marginStart: '1%',
  },roleText:{
    fontSize: calculateFontSize(18),
    fontFamily: 'Fredoka-Bold',
  }
})

export default ProfileBar