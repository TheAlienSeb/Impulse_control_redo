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
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CardMenuTab: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } else {
                    router.replace('/(auth)/sign-in');
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };

        loadUser();
    }, []);

    const handleAddMoney = () => {
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
                    onPress: () => console.log("Money added"),
                },
            ],
            { cancelable: false }
        );
    };

    const handleCardDetails = () => {
        console.log("Card details clicked");
    };

    const handleLockCard = () => {
        router.replace("/question2");
    };

    const handleSeeAllTransactions = () => {
        setShowAllTransactions(true);
    };

    if (!user) {
        return <ActivityIndicator size="large" color="#0369A1" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    const balanceText = `$${user.balance.toFixed(2)}`;
    const availabilityText = user.balance > 20 ? "Available to spend." : "Unavailable to spend";
    const cardNumberLast4 = user.card.cardNumber.slice(-4);
    const transactionsToShow = showAllTransactions ? user.transactions : user.transactions.slice(0, 3);

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
                <Text style={styles.header1}>Primary card ****{cardNumberLast4}</Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleAddMoney}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Add Money</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCardDetails}
                        >
                            <Text style={styles.buttonText}>🡒</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Card Details</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLockCard}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Lock Card</Text>
                    </View>
                </View>
                <View style={styles.colLeft}>
                    <Text style={styles.header3}>Latest Transactions</Text>
                    {user.transactions.length === 0 ? (
                        <Text style={styles.info}>No Transactions Yet...</Text>
                    ) : (
                        transactionsToShow.map((transaction, index) => (
                            <View key={index} style={(styles.row, styles.tab)}>
                                <View style={styles.colLeft}>
                                    <Text style={styles.infoWhite}>{transaction.type}</Text>
                                    <Text style={styles.info}>
                                        {transaction.description}
                                    </Text>
                                </View>
                                <Text style={styles.infoWhite}>${transaction.amount.toFixed(2)}</Text>
                            </View>
                        ))
                    )}
                    {user.transactions.length > 3 && !showAllTransactions && (
                        <TouchableOpacity onPress={handleSeeAllTransactions}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    )}
                </View>
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
        justifyContent: "space-around",
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
        marginTop: "4%",
    },
    seeAllText: {
        color: colors.primaryColor,
        fontSize: colors.text,
        textAlign: "center",
        marginTop: 10,
    },
});

export default CardMenuTab;
