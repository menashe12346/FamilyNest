import React from 'react';
import { View, Modal, FlatList, StyleSheet } from 'react-native';
import ProfileBar from './ProfileBar'; // Adjust the import according to your file structure
import { useState } from 'react';

const ListDropdown = ({ profiles, style }) => {
  const [showDropdown,setShowDropdown]= useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 135, left: 0 });
  console.log('position ',dropdownPosition)
  profiles = profiles.profiles;
  console.log('profiles to show:',profiles)

  const [selectedProfile,setSelected]= useState(profiles[0])
  console.log('show dropdown1',showDropdown)

  // Toggle the visibility of the dropdown list
  const toggleDropdown = () => {
    console.log('showDropDown',showDropdown);
    setShowDropdown(true);
  };

  const onProfileBarLayout = (event) => {
    console.log('onLayout')
    const { x, y, height } = event.nativeEvent.layout;
    setDropdownPosition({
      top: y + height, // Position the dropdown below the ProfileBar
      left: x,
    });
  };

const renderItem = ({ item }) => {
    console.log("item rendered:" ,item);
    return <View style={{height:75}}>
    <ProfileBar profile={item} onPress={()=>{
      setSelected(item)
      setShowDropdown(false)
    }}/>
  </View>
};

  return (
    <View style={{}}>
      {/* ProfileBar that triggers the dropdown */}
      <ProfileBar style={style} profile={selectedProfile} onPress={toggleDropdown}
              onLayout={onProfileBarLayout} // Measure the ProfileBar position
      />

      {/* Modal for the dropdown list */}
      {showDropdown && (
        <Modal transparent={true} visible={showDropdown} animationType="fade">
          <View style={styles.modalBackground}>
          <View
              style={[
                styles.dropdownContainer,
                {
                  top: dropdownPosition.top, // Position dropdown based on ProfileBar
                  left: dropdownPosition.left,
                },
              ]}
            >
              <FlatList
                data={profiles}  // List of profiles
                keyExtractor={(item) => item.id.toString()}  // Ensure the id is converted to string
                renderItem={renderItem}  // Render each item using ProfileBar
                contentContainerStyle={styles.flatListContainer} // Add container style
                initialNumToRender={profiles.length} // Render all items
                ItemSeparatorComponent={() => (
                  <View style={styles.separator} />
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexGrow:1,
    borderWidth:4,
    borderColor:'green',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 1,
    width: '80%',
    maxHeight:125, // Limiting the height of the dropdown
  },
  profileBarItem: {
  }, flatListContainer: {
    paddingVertical: 0, // Space between items and the container edges
  },profileContainer: {
    marginBottom:0, // Space between each item, adjust as needed
    height:'50%'
  },separator:{
    height:10
  }
});

export default ListDropdown;
