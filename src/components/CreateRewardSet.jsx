import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";

const CreateRewardSet = ({ show }) => {
    return (
        <Modal visible={show} transparent={true} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.text}>CreateRewardSet</Text>
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
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CreateRewardSet;
