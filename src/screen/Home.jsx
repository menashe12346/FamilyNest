import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');




const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parents Screen</Text>
      <TouchableOpacity
        activeOpacity={0}
        style={styles.button}
        onPress={() =>
          navigation.navigate('NewScreen', {
            items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
          })
        }
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const calculateFontSize = (size) => Math.min(width, height) * (size / 100);


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1F4',
    alignItems: 'center', // Centers content horizontally
  },
  headerText: {
    fontSize: calculateFontSize(10),  
    fontWeight: 'bold',
    color: '#542F2F',
    marginBottom: '150%', // Add some space from the top or other content
  },
  button: {
    left: '35%',
    width: '17%',
    height: '8%',
    borderRadius: 800,
    backgroundColor: '#B85455',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: calculateFontSize(5),
    color: 'white',
    fontWeight: 'bold',
  },
});
