import colors from "../../styles/globalVar";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AIChat: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setChatHistory(parsedUser.aichat || []);
                    if (parsedUser.transactions && parsedUser.transactions.length > 0) {
                        await handleChatSubmit(parsedUser);
                    } else {
                        setLoading(false);
                    }
                } else {
                    router.replace("/(auth)/sign-in");
                }
            } catch (error) {
                console.error("Error loading user:", error);
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleChatSubmit = async (user) => {
        try {
            const response = await axios.post("http://localhost:5000/api/chat", {
                email: user.email,
                transactions: user.transactions,
                balance: user.balance,
            });

            if (response.data.success) {
                const newChat = response.data.chat;
                const updatedChatHistory = [...chatHistory, newChat];
                setChatHistory(updatedChatHistory);
                await AsyncStorage.setItem("user", JSON.stringify({ ...user, aichat: updatedChatHistory }));
            } else {
                Alert.alert("Error", response.data.error);
            }
        } catch (error) {
            console.error("Error sending chat message:", error);
            Alert.alert("Error", "An error occurred while sending chat message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={(styles.scrollViewContent, styles.container)}
        >
            <Text style={styles.header}>AI Chat</Text>
            <View style={styles.chatContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : user && user.transactions && user.transactions.length > 0 ? (
                    <View style={styles.chatBox}>
                        {chatHistory.map((chat, index) => (
                            <Text key={index} style={styles.chatMessage}>{chat}</Text>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.noTransactionsText}>Waiting for transactions to analyze</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    chatContainer: {
        width: "90%",
        alignItems: "center",
        flex: 1,
        padding: 10,
    },
    chatBox: {
        width: "100%",
        height: 300,
        backgroundColor: colors.secondaryColor,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    chatMessage: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
    loadingText: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
    noTransactionsText: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
});

export default AIChat;