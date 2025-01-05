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
    return <ProfileBar style={style} profile={item} />;
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
    padding: 20,
    width: '80%',
    maxHeight: 300, // Limiting the height of the dropdown
  },
  profileBarItem: {
    marginBottom: 10, // Adding space between the profile bars
  },
});

export default ListDropdown;
