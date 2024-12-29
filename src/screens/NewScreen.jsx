import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NewScreen = ({ route, navigation }) => {
  // Handle missing params
  const { items = [] } = route.params || {};

  // Animation for screen entry
  const viewPosition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    Animated.timing(viewPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true, // Ensures smooth native animations
    }).start();
  }, []);

  // Track screen width for dynamic item layout
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove(); // Cleanup on unmount
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedContainer, { transform: [{ translateY: viewPosition }] }]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Select Tasks to add</Text>
        </View>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: screenWidth * 0.1 },
          ]}
        >
          {items.map((item, index) => (
            <View style={[styles.wideItem, { width: screenWidth * 0.8 }]} key={item.id || index}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <LinearGradient
            colors={['#E99091', '#CD9D9E']}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1F4',
  },
  animatedContainer: {
    flex: 1,
  },
  header: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#542F2F',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  wideItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    width: '60%',
    height: Dimensions.get('window').height * 0.07,
    overflow: 'hidden',
    backgroundColor: '#B85455',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 50,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
