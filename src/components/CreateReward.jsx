import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { rewardsOptions } from "../utils/RewardUtils";
import LottieView from "lottie-react-native";
import { calculateFontSize } from "../utils/FontUtils";
import ValuePicker from "./ValuePicker";

const CreateReward = ({ show, setShowModal }) => {
  const [selectedReward, setSelectedReward] = useState(
    require("../assets/animations/rewards/present.json")
  );

  const [price, setPrice] = useState();
  const [amount, setAmount] = useState(0);

  const handleSubmit = async () => {
    setShowModal(false);
  };

  const handleCancel = async () => {
    setShowModal(false);
  };

  const renderReward = ({ item }) => {
    const height = 80;
    const width = 80;

    return (
      <TouchableOpacity
        style={styles.rewardAnimation}
        onPress={() => {setSelectedReward(item.content)}}
      >
        <LottieView
          source={item.content}
          style={{ width: width, height: height }}
          autoPlay={true}
          loop={false}
        />
        <Text style={styles.rewardText}>{item.reward}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={show} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.rewardAnimation}></View>
          <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
            Choose reward:
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={rewardsOptions}
              renderItem={renderReward}
              keyExtractor={(item) => item.id}
              numColumns={3} // Three avatars per row
              contentContainerStyle={styles.rewardList}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 2,
                    backgroundColor: "#aaa",
                    marginHorizontal: 10,
                  }}
                />
              )}
            />
          </View>
          <View style={{ height: 10 }} />
          <View>
            <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
              Set price and quantity:
            </Text>
          </View>
          <View style={styles.selectedContainer}>
            <LottieView
              source={selectedReward}
              style={{ width: 120, height: 120 }}
              autoPlay={true}
              loop={true}
            />
            <View
              style={{
                alignContent: "center",
                alignSelf: "center",
                padding: 10,
              }}
            >
              <TextInput
                value={price} // Set the value of the TextInput to the state
                onChangeText={(price) => setPrice(price)} // Update the state when the text changes
                placeholder="Price" // Placeholder text
                inputMode="numeric"
                style={styles.priceContainer}
                maxLength={4}
              />
              <View style={{ marginTop: 10 }}>
                <Text
                  style={[
                    styles.semiBoldText,
                    { fontSize: calculateFontSize(16) },
                  ]}
                >
                  Quantity:
                </Text>
                <ValuePicker value={amount} setValue={setAmount} />
              </View>
            </View>
          </View>
          <View style={{alignSelf:'center',padding:4,flexDirection:'row'}}>
          <TouchableOpacity style={styles.selectButton} onPress={handleSubmit}>
            <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
              Add Reward
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectButton} onPress={handleCancel}>
            <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 350,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
    //alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    height: 400,
    width: 350,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  rewardAnimation: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  rewardText: {
    fontFamily: "Fredoka-SemiBold",
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: 80, // Set the width or maxWidth for wrapping
  },
  rewardList: {
    alignSelf: "center",
  },
  boldText: {
    fontFamily: "Fredoka-Bold",
    fontSize: calculateFontSize(20),
  },
  semiBoldText: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: calculateFontSize(20),
  },
  selectButton: {
    backgroundColor: "#aaa",
    borderRadius: 10,
    elevation: 10,
    padding: 5,
    marginHorizontal:10
  },
  selectedContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
    alignSelf: "center",
  },
  priceContainer: {
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#aaa",
  },
});

export default CreateReward;
