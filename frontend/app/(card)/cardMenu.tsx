import colors from "../styles/globalVar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CardMenuTab: React.FC = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.header}>$250.00</Text>
                <Text style={styles.info}>Available to spend.</Text>
                <Image
                    source={require("../../assets/images/cardbg.jpg")}
                    style={styles.image}
                ></Image>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                router.replace("/question2");
                            }}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Add Money</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                router.replace("/question2");
                            }}
                        >
                            <Text style={styles.buttonText}>🡒</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Card Details</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                router.replace("/question2");
                            }}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.info}>Lock Card</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.header}>Latest Transactions</Text>
            <View style={styles.col}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.info}>Transfer</Text>
                        <Text style={styles.info}>To Haasil Pujara **03</Text>
                    </View>
                    <Text style={styles.info}>$3.50</Text>
                </View>
            </View>
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
        height: "90%",
        overflow: "scroll",
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
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
    },
    image: {
        transform: [{ rotate: "90deg" }],
        marginBottom: 80,
        marginTop: 60,
        height: 200,
        width: 300,
        borderRadius: 20,
    },
});

export default CardMenuTab;
