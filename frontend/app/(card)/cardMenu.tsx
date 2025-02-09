import colors from "../styles/globalVar";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const CardMenuTab: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [animationHeight] = useState(new Animated.Value(0));

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('Loaded user:', parsedUser); // Debug log
                    setUser(parsedUser);
                } 
                else {
                    router.replace("/(auth)/sign-in");
                }
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        loadUser();
    }, []);

    const handleAddMoney = async () => {
        Alert.alert(
            "Add Money",
            "Are you sure you want to add money?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            const newBalance = user.balance + 100; // Example increment
                            const response = await axios.put('http://localhost:5000/api/updateBalance', {
                                email: user.email,
                                balance: newBalance,
                            });
                            if (response.data.success) {
                                const updatedUser = { ...user, balance: newBalance };
                                setUser(updatedUser);
                                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                                Alert.alert('Success', 'Money added successfully');
                            } else {
                                Alert.alert('Error', response.data.error);
                            }
                        } catch (error) {
                            console.error('Error adding money:', error);
                            Alert.alert('Error', 'An error occurred while adding money');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleCardDetails = () => {
        console.log("Card details clicked");
    };

    const handleLockCard = () => {
        router.replace("../(root)/(tabs)/home");
    };

    const handleToggleTransactions = () => {
        if (showAllTransactions) {
            Animated.timing(animationHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setShowAllTransactions(false));
        } else {
            setShowAllTransactions(true);
            Animated.timing(animationHeight, {
                toValue: user.transactions.length * 60, // Adjust height based on the number of transactions
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    if (!user) {
        return (
            <ActivityIndicator
                size="large"
                color="#0369A1"
                style={{ flex: 1, justifyContent: "center" }}
            />
        );
    }

    const balanceText = `$${user.balance.toFixed(2)}`;
    const availabilityText =
        user.balance > 20
            ? "Available to spend."
            : `Unavailable to spend ($${user.balance.toFixed(2)})`;
    const cardNumberLast4 = user.card.cardNumber.slice(-4);
    const transactionsToShow = showAllTransactions
        ? user.transactions
        : user.transactions.slice(0, 3);

    console.log('Transactions to show:', transactionsToShow); // Debug log

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.spaceBetweenContainer}
                showsVerticalScrollIndicator={false} // Hide vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
            >
                <Text style={styles.header}>{balanceText}</Text>
                <Text style={styles.info}>{availabilityText}</Text>
                <Image
                    source={require("../../assets/images/cardbg.jpg")}
                    style={styles.image}
                ></Image>
                <Text style={styles.header1}>
                    Primary card ****{cardNumberLast4}
                </Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleAddMoney}
                        >
                            <Text style={styles.buttonText}>
                                <Icon
                                    name="plus"
                                    size={25}
                                    color={colors.textColor}
                                    style={{ paddingBottom: 5 }}
                                />
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Add Money</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCardDetails}
                        >
                            <Text style={styles.buttonText}>
                                <Icon
                                    name="credit-card"
                                    size={25}
                                    color={colors.textColor}
                                    style={{ paddingBottom: 5 }}
                                />
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Card Details</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLockCard}
                        >
                            <Text style={styles.buttonText}>
                                <Icon
                                    name="lock"
                                    size={25}
                                    color={colors.textColor}
                                    style={{ paddingBottom: 5 }}
                                />
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Lock Card</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header3}>Latest Transactions</Text>
                    <TouchableOpacity onPress={handleToggleTransactions}>
                        <Text style={styles.seeAllText}>
                            {showAllTransactions ? "Show Less" : "Show More"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{ height: animationHeight }}>
                    {user.transactions.length === 0 ? (
                        <Text style={styles.info}>No Transactions Yet...</Text>
                    ) : (
                        transactionsToShow.map((transaction, index) => (
                            <View key={index} style={[styles.row, styles.tab]}>
                                <Icon
                                    name="money"
                                    size={25}
                                    color={colors.textColor}
                                    style={styles.imageIcon}
                                />
                                <View style={styles.colLeft}>
                                    <Text style={styles.infoWhite}>
                                        {transaction.type}
                                    </Text>
                                    <Text style={styles.info}>
                                        {transaction.description}
                                    </Text>
                                </View>
                                <Text style={styles.infoWhite}>
                                    ${transaction.amount.toFixed(2)}
                                </Text>
                            </View>
                        ))
                    )}
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        height: "100%",
    },
    header: {
        fontSize: colors.h1,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
    },
    header1: {
        fontSize: colors.h1,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
        textAlign: "center",
    },
    header3: {
        fontSize: colors.h3,
        fontWeight: "700",
        marginBottom: 20,
        justifyContent: "flex-start",
        color: colors.textColor,
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
        opacity: 0.5,
        marginTop: 10,
    },
    infoWhite: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
        marginTop: 10,
    },
    button: {
        color: colors.textColor,
        backgroundColor: colors.primaryColor,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: colors.textColor,
        fontSize: colors.text,
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "90%",
        paddingHorizontal: 20,
        marginTop: 60,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    tab: {
        backgroundColor: colors.secondaryColor,
        padding: 10,
        paddingHorizontal: 50,
        marginVertical: 5,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
        fontWeight: "500",
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
    },
    colLeft: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    image: {
        transform: [{ rotate: "90deg" }],
        marginBottom: 80,
        marginTop: 60,
        height: 200,
        width: 300,
        borderRadius: 20,
    },
    imageIcon: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: "10%",
    },
    seeAllText: {
        color: colors.primaryColor,
        fontSize: colors.text,
        textAlign: "center",
        marginTop: 10,
    },
});

export default CardMenuTab;
