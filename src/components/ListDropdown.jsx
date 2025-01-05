import React from 'react';
import { View, Modal, FlatList, StyleSheet } from 'react-native';
import ProfileBar from './ProfileBar'; // Adjust the import according to your file structure

const ListDropdown = ({ profiles, setShow, show, style }) => {
  profiles = profiles.profiles;

  // Toggle the visibility of the dropdown list
  const toggleDropdown = () => {
    console.log('showDropDown',show);
    setShow(true);
  };

const renderItem = ({ item }) => {
    console.log(item);
    return <View style={styles.profileContainer}>
    <ProfileBar profile={item} />
  </View>
};

  return (
    <View>
      {/* ProfileBar that triggers the dropdown */}
      <ProfileBar style={style} profile={profiles[0]} onPress={toggleDropdown} />

      {/* Modal for the dropdown list */}
      {true && (
        <Modal transparent={true} visible={show} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.dropdownContainer}>
              <FlatList
                data={profiles}  // List of profiles
                keyExtractor={(item) => item.id.toString()}  // Ensure the id is converted to string
                renderItem={renderItem}  // Render each item using ProfileBar
                contentContainerStyle={styles.flatListContainer} // Add container style
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 1,
    width: '80%',
    maxHeight: 300, // Limiting the height of the dropdown
  },
  profileBarItem: {
  }, flatListContainer: {
    paddingVertical: 0, // Space between items and the container edges
  },profileContainer: {
    marginBottom:0, // Space between each item, adjust as needed
    height:'50%'
  },
});

export default ListDropdown;
