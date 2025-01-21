import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { rewardsOptions } from "../utils/RewardUtils";
import LottieView from "lottie-react-native";
import { calculateFontSize } from "../utils/FontUtils";
import ValuePicker from "./ValuePicker";

const CreateReward = ({ show, setShowModal, reward, setReward }) => {
  const [selectedReward, setSelectedReward] = useState({
    id: 12,
    reward: "Present",
    content: require("../assets/animations/rewards/present.json"),
  });

  const [price, setPrice] = useState();
  const [amount, setAmount] = useState(0);

  const validateInputs = () => {
    if (!selectedReward || selectedReward.id === 12) {
      alert("Please select reward");
      return false;
    }
    if (!price || isNaN(price) || price <= 0) {
      alert("Please enter a valid price.");
      return false;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log("Creating Reward");
    if (validateInputs()) {
      try {
        const updatedReward = {
          ...selectedReward,
          price: price, // Add the price property
          amount: amount, // Add the amount property
        };

        console.log("Updated Reward (before state update):", updatedReward);

        setReward(updatedReward);

        console.log("Reward state update triggered");
      } catch (error) {
        console.error("Error updating reward:", error);
      }
      setAmount(0);
      setPrice();
      setSelectedReward({
        id: 12,
        reward: "Present",
        content: require("../assets/animations/rewards/present.json"),
      });
      setShowModal(false);
    }
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
        onPress={() => {
          setSelectedReward(item);
        }}
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
          <Text style={[styles.regularText, { textAlign: "center" }]}>
            Set amount of points needed,{"\n"}
            and number of times reward will be available.
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
          <View style={{ marginTop: 30 }} />
          <View>
            <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
              Set price and quantity:
            </Text>
          </View>
          <View style={styles.selectedContainer}>
            <View>
              <LottieView
                source={selectedReward.content}
                style={{ width: 120, height: 120 }}
                autoPlay={true}
                loop={true}
              />
              <Text
                style={[
                  styles.semiBoldText,
                  { fontSize: calculateFontSize(14), textAlign: "center" },
                ]}
              >
                {selectedReward.reward}
              </Text>
            </View>
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
          <View
            style={{ alignSelf: "center", padding: 4, flexDirection: "row" }}
          >
            <TouchableOpacity
              style={styles.selectButton}
              onPress={handleSubmit}
            >
              <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
                Add Reward
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={handleCancel}
            >
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
  regularText: {
    fontFamily: "Fredoka-Regular",
    fontSize: calculateFontSize(14),
  },
  selectButton: {
    backgroundColor: "#D5EEFF",
    borderRadius: 10,
    elevation: 10,
    padding: 5,
    marginHorizontal: 10,
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
    backgroundColor: "#D5EEFF",
  },
});

export default CreateReward;
