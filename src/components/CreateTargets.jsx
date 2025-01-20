import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "./DateTimePicker";
import { useState } from "react";
import React from "react";
import { calculateFontSize } from "../utils/FontUtils";
import { TextInput } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const CreateTargets = ({ show, setShowModal, target, setTarget }) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [taskTarget, setTaskTarget] = useState("");
  const [targetReward, setTargetReward] = useState("");

  const handleSubmit =()=>{
    console.log('submit target')
  }

  const handleCancel =()=>{
    console.log('cancel target')
    setShowModal(false)
  }

  return (
    <Modal visible={show} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={[styles.semiBoldText, { textAlign: "center" }]}>
            Create Target
          </Text>
          <Text style={[styles.regularText, { textAlign: "center" }]}>
            Set collective target for the whole family,{"\n"}reward for
            completing X amount of tasks,{"\n"}in a given time.
          </Text>
          <View
            style={{
              marginVertical: 10,
              borderWidth: 2,
              borderRadius: 20,
              borderColor: "#aaa",
              padding: 10,
            }}
          >
            <LottieView
              source={require("../assets/animations/trophy.json")}
              style={{ alignSelf: "center", width: 100, height: 100 }}
              autoPlay={true}
              loop={true}
            />
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                marginLeft: 20,
                alignItems: "center",
                alignSelf: "center,",
              }}
            >
              <TextInput
                value={targetReward} // Set the value of the TextInput to the state
                onChangeText={(reward) => setTargetReward(reward)} // Update the state when the text changes
                placeholder="Target Reward" // Placeholder text
                inputMode="text"
                style={[styles.targetContainer, { width: 180 }]}
                maxLength={15}
              />
              <TextInput
                value={taskTarget} // Set the value of the TextInput to the state
                onChangeText={(target) => setTaskTarget(target)} // Update the state when the text changes
                placeholder="Target" // Placeholder text
                inputMode="numeric"
                style={[styles.targetContainer, { width: 60, marginLeft: 10 }]}
                maxLength={3}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                marginLeft: 10,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={styles.regularText}>Deadline: </Text>
              <TouchableOpacity
                style={styles.DateTimePicker}
                onPress={() => setShowDate(true)}
              >
                <Text>
                  {" "}
                  {date ? date.toLocaleDateString() : "Select date"}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.DateTimePicker, { marginLeft: 8 }]}
              >
                <Text>
                  {" "}
                  {date ? date.toLocaleTimeString() : "Select time"}{" "}
                </Text>
              </TouchableOpacity>
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
        </View>
      </View>
      <DateTimePicker
        date={date}
        time={date}
        setDate={setDate}
        setTime={setDate}
        show={showDate}
        setShow={setShowDate}
      />
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
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  DateTimePicker: {
    padding: 5,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: "#D5EEFF",
  },
  semiBoldText: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: calculateFontSize(18),
  },
  regularText: {
    fontFamily: "Fredoka-Regular",
    fontSize: calculateFontSize(14),
  },
  targetContainer: {
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#D5EEFF",
  },selectButton: {
    backgroundColor: "#D5EEFF",
    borderRadius: 10,
    elevation: 10,
    padding: 5,
    marginHorizontal: 10,
  },
});

export default CreateTargets;
