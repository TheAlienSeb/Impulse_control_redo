import colors from "../styles/globalVar";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CardCreateTab: React.FC = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setCardDetails({ ...cardDetails, [field]: value });
    };

    const handleSaveCardDetails = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const response = await axios.put("http://localhost:5000/api/updateCardDetails", {
                    email: parsedUser.email,
                    cardDetails: cardDetails,
                });

                if (response.data.success) {
                    // Update the user data in AsyncStorage
                    parsedUser.card = cardDetails;
                    await AsyncStorage.setItem("user", JSON.stringify(parsedUser));
                    Alert.alert("Success", "Card details updated successfully!");
                    setModalVisible(false);
                    router.replace("/cardMenu");
                } else {
                    Alert.alert("Error", response.data.error || "Something went wrong. Please try again.");
                }
            } else {
                router.replace("/(auth)/sign-in");
            }
        } catch (error) {
            console.error("Error updating card details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update card details.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.header}>
                    Create your Smart Save Card today!
                </Text>
                <Text style={styles.info}>
                    Make budget planning easier with our Smart Save Card.
                </Text>
                <TouchableOpacity
                    style={styles.cardBox}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.plusSign}>+</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter Card Details</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Card Holder Name"
                                value={cardDetails.cardName}
                                onChangeText={(value) => handleInputChange("cardName", value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Card Number"
                                value={cardDetails.cardNumber}
                                onChangeText={(value) => handleInputChange("cardNumber", value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Expiry Date"
                                value={cardDetails.expiryDate}
                                onChangeText={(value) => handleInputChange("expiryDate", value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="CVV"
                                value={cardDetails.cvv}
                                onChangeText={(value) => handleInputChange("cvv", value)}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveCardDetails}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontSize: 50,
        fontWeight: "900",
        marginBottom: 20,
        color: colors.primaryColor,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
        textAlign: "center",
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
        opacity: 0.5,
    },
    cardBox: {
        width: 350,
        height: 200,
        backgroundColor: "#D3D3D3",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    plusSign: {
        fontSize: 50,
        color: "#000",
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: colors.primaryColor,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default CardCreateTab;