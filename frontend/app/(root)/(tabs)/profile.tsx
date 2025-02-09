import colors from "../../styles/globalVar";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("2005-10-20");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setFullName(parsedUser.fullName);
                    setDateOfBirth(parsedUser.dateOfBirth || "2005-10-20");
                } else {
                    router.replace("/(auth)/sign-in");
                }
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        loadUser();
    }, []);

    const handleSaveChanges = async () => {
        if (!fullName || !dateOfBirth || !confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (confirmPassword !== user.password) {
            Alert.alert("Error", "Password does not match");
            return;
        }

        try {
            const response = await axios.put("http://localhost:5000/api/updateProfile", {
                email: user.email,
                fullName: fullName,
                dateOfBirth: dateOfBirth,
                password: confirmPassword,
            });

            if (response.data.success) {
                const updatedUser = response.data.user;
                await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
                Alert.alert("Success", "Profile updated successfully");
                router.replace("/home");
            } else {
                Alert.alert("Error", response.data.error);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "An error occurred while updating profile");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={(styles.scrollViewContent, styles.container)}
        >
            <Text style={styles.header}>Profile Setting</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.smallText}>Full Name</Text>
                <View style={styles.inputContainerRow}>
                    <Icon name="user" size={15} color={colors.textColor}></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="white"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <Text style={styles.smallText}>Date of Birth</Text>
                <View style={styles.inputContainerRow}>
                    <Icon
                        name="birthday-cake"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder="Date of Birth"
                        placeholderTextColor="white"
                        value={dateOfBirth}
                        editable={false}
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <Text style={styles.smallText}>Password</Text>
                <View style={styles.inputContainerRow}>
                    <Icon name="lock" size={15} color={colors.textColor}></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="white"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <TouchableOpacity
                    onPress={ () => router.replace("/home")}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        textAlign: "center",
        marginTop: "10%",
    },
    scrollViewContent: {
        marginTop: "15%",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
    },
    smallText: {
        color: "white",
        fontSize: colors.text,
        fontWeight: "600",
        alignSelf: "flex-start",
        marginLeft: "1%",
    },
    inputContainer: {
        width: "90%",
        alignItems: "center",
        flex: 1,
        padding: 10,
    },
    inputContainerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
        backgroundColor: colors.secondaryColor,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: colors.textColor,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: colors.secondaryColor,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: "white",
        borderWidth: 0,
    },
    dateText: {
        color: "white",
        fontSize: colors.text,
    },
    buttonStyle: {
        width: "90%",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        borderRadius: 50,
        justifyContent: "center",
        marginTop: 15,
        padding: 10,
    },
    buttonText: {
        color: "white",
        fontSize: colors.text,
        fontWeight: "600",
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
});

export default Profile;
