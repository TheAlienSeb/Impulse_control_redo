import colors from "../styles/globalVar";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Question1: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const router = useRouter();

    const handleUpdateFullName = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const response = await axios.put("http://localhost:5000/api/updateFullName", {
                    email: parsedUser.email,
                    fullName: fullName,
                });

                if (response.data.success) {
                    // Update the user data in AsyncStorage
                    parsedUser.fullName = fullName;
                    await AsyncStorage.setItem("user", JSON.stringify(parsedUser));
                    Alert.alert("Success", "Full name updated successfully!");
                    router.replace("/question2");
                } else {
                    Alert.alert("Error", response.data.error || "Something went wrong. Please try again.");
                }
            } else {
                router.replace("/(auth)/sign-in");
            }
        } catch (error) {
            console.error("Error updating full name:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update full name.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>IMPUL$E</Text>
                <Text style={styles.header}>What is your full name?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFullName}
                    value={fullName}
                    placeholder="Enter your name"
                    keyboardType="default"
                />
                <Text style={styles.info}>
                    For security and regulatory purposes, please enter name
                    based on your real ID.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleUpdateFullName}
                >
                    <Text style={styles.buttonText}>I'm ready 🡒</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
        opacity: 0.5,
    },
    button: {
        color: colors.textColor,
        backgroundColor: colors.primaryColor,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonText: {
        color: colors.textColor,
        fontSize: colors.text,
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        backgroundColor: colors.accentColor,
        padding: 15,
        color: colors.textColor,
        borderRadius: 50,
        borderColor: colors.primaryColor,
        justifyContent: "center",
    },
});

export default Question1;
