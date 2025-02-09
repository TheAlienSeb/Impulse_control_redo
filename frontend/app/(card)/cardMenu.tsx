import colors from "../styles/globalVar";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CardMenuTab: React.FC = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.spaceBetweenContainer}
                showsVerticalScrollIndicator={false} // Hide vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
            >
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
                                console.log("Add money clicked");
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
                                            onPress: () =>
                                                console.log("Money added"),
                                        },
                                    ],
                                    { cancelable: false }
                                );
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
                                console.log("Add money clicked");
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
                                            onPress: () =>
                                                console.log("Money added"),
                                        },
                                    ],
                                    { cancelable: false }
                                );
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
                <View style={styles.colLeft}>
                    <Text style={styles.header3}>Latest Transactions</Text>
                    <View style={(styles.row, styles.tab)}>
                        <View style={styles.colLeft}>
                            <Text style={styles.infoWhite}>Transfer</Text>
                            <Text style={styles.info}>
                                To Haasil Pujara **03
                            </Text>
                        </View>
                        <Text style={styles.infoWhite}>$3.50</Text>
                    </View>
                    <View style={(styles.row, styles.tab)}>
                        <View style={styles.colLeft}>
                            <Text style={styles.infoWhite}>Transfer</Text>
                            <Text style={styles.info}>
                                To Haasil Pujara **03
                            </Text>
                        </View>
                        <Text style={styles.infoWhite}>$3.50</Text>
                    </View>
                    <View style={(styles.row, styles.tab)}>
                        <Image
                            source={require("../../assets/images/placeholder.png")}
                            style={styles.imageIcon}
                        ></Image>
                        <View style={styles.colLeft}>
                            <Text style={styles.infoWhite}>Transfer</Text>
                            <Text style={styles.info}>
                                To Haasil Pujara **03
                            </Text>
                        </View>
                        <Text style={styles.infoWhite}>$3.50</Text>
                    </View>
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
});

export default CardMenuTab;
