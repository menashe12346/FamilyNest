import React from 'react';
import { FlatList, Text, View, StyleSheet , TextInput ,Dimensions } from 'react-native';
import { calculateFontSize } from '../utils/FontUtils';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
// Example components
const HeaderComponent = ({}) => (
  <View style={styles.header}>
    <Text style={styles.textHead}>Create your <Text style={styles.brandText}>FamilyNest</Text> account!</Text>
  </View>
);

const PersonalDetailsText = ({}) => (
  <View>
    <Text style={styles.stepText}>Account Information:</Text>
  </View>
);

const CreatorStep = ({ }) => (
  <View>
    <Text style={styles.stepText}>Create your profile:</Text>
  </View>
);

const PartnerStep = ({ }) => (
  <View>
    <Text style={styles.stepText}>Add your partner:</Text>
  </View>
);

const UserFamilyComponent = ({}) =>(
  <View style={styles.ufComponent}>
    <View style={styles.familyNameComponent}>
      <TextInput style={styles.inputComponent}
        placeholder="Family Name"
      />
    </View>
    <View style={styles.userNameComponent}>
      <TextInput style={styles.inputComponent}
        placeholder="User name"
      />
    </View>
  </View>
);

const EmailComponent = ({})=> (
  <View style={styles.emailContainer}>
      <FontAwesome name="user" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Enter your email address"
      />
    </View>
);

const PasswordsComponent = ({})=> (
  <View style={styles.passwordsContainer}>
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Enter password"
      />
    </View>
    <View style={styles.emailContainer}>
      <FontAwesome name="lock" size={28} color={"#9A9A9A"} style={styles.inputIcon} />
      <TextInput
        style={styles.inputComponent}
        placeholder="Re-Enter password"
      />
    </View>
  </View>
);

const CarouselImages =({})=>(
  <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
);



// Data
const data = [
  { id: '1', type: 'header'},
  { id: '2', type: 'personal-step'},
  { id: '3', type: 'user-family'},
  { id: '4', type: 'email-address',},
  { id: '5', type: 'passwords',},
  // TODO phone number
  { id: '6', type: 'creator-step'},
  { id: '7', type: 'creator-profile'},
  { id: '8', type: 'partner-step'},
  { id: '9', type: 'partner-profile'},
];

// Main component
export default function App() {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <HeaderComponent title={item.title} />;
      case  'personal-step':
        return <PersonalDetailsText/>
      case 'user-family':
        return <UserFamilyComponent />
      case 'email-address':
        return <EmailComponent />
      case 'passwords':
        return <PasswordsComponent />
      case 'creator-step':
        return <CreatorStep />
      case 'creator-profile':
        return <CarouselImages />
      case 'partner-step':
        return <PartnerStep />
      case 'partner-profile':
        return <PasswordsComponent />        
      default:
        return null;
    }
  };

  return (
    <FlatList
    style={{ backgroundColor: '#E4F1F4' }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  header: { padding: 16},
  headerText: { fontWeight: 'bold', fontSize: 18 },
  separator: { height: 1, backgroundColor: '#ccc' },
  textHead: {
    textAlign: 'center',
    marginTop:5,
    fontSize: calculateFontSize(18),
    fontWeight: 'bold',
  },brandText:{
    color:"#B85455",
  },stepText:{
    textAlign: 'left',
    paddingStart:'5%',
    fontWeight:'600',
    marginBottom:'1%',
    fontSize: calculateFontSize(15),
  },ufComponent:{
    flexDirection:'row',
    justifyContent:'center',
    //marginTop:'2%'
  },familyNameComponent:{
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      width:'35%',
      marginStart:'0%',
      elevation:10,
      borderRadius: 18,
  },userNameComponent:{
      backgroundColor: "#FFFFFF",
      width:'42%',
      flexDirection: "row",
      marginStart:'2%',
      elevation:10,
      borderRadius: 18,
  },inputComponent:{
      fontSize:calculateFontSize(14),
      marginStart:'2%'
  },emailContainer:{
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      marginTop:'2%',
      width:'80%',
      alignSelf:'center',
      alignItems:'center',
      elevation:10,
      borderRadius: 18,
  },inputIcon: {
      marginLeft: '4%',
      alignSelf: "baseline",
      paddingTop:'7'
  },passwordsContainer:{
    flexDirection:'column',
    justifyContent:'center',
  }
});
