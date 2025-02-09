import colors from "../../styles/globalVar";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../../../assets/ProgressBar";

const ImpulseTab: React.FC = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.header}>Understanding Impulse Scores</Text>
                <Text style={styles.info}>
                    Impulse scores calculate the user's level of susceptibility
                    to spending at a certain time. It is calculated based on the
                    user's spending habits and the time of day.
                </Text>
                <ProgressBar score={615} />
                <Text style={styles.header1}>615</Text>
                <Text style={styles.header}>Good Score</Text>
                <Text style={styles.info}>
                    Impulse spending is not a problem for you. You have a high
                    level.
                </Text>
                <View style={styles.spaceBetweenContainer}>
                    <View style={styles.row}>
                        <Text style={styles.info}>Below 500</Text>
                        <View style={styles.rowMini}>
                            <Text style={styles.info}>Poor</Text>
                            <Icon name="frown-o" size={16} color="red"></Icon>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.row}>
                        <Text style={styles.info}>500 - 600</Text>
                        <View style={styles.rowMini}>
                            <Text style={styles.info}>Fine</Text>
                            <Icon
                                name="exclamation-circle"
                                size={16}
                                color="yellow"
                            ></Icon>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.row}>
                        <Text style={styles.info}>600 - 700</Text>
                        <View style={styles.rowMini}>
                            <Text style={styles.info}>Good</Text>
                            <Icon
                                name="thumbs-up"
                                size={16}
                                color="lightgreen"
                            ></Icon>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.row}>
                        <Text style={styles.info}>700+</Text>
                        <View style={styles.rowMini}>
                            <Text style={styles.info}>Excellent</Text>
                            <Icon name="smile-o" size={16} color="green"></Icon>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
    },
    header: {
        fontSize: colors.h3,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
        textAlign: "center",
        marginTop: "10%",
    },
    header1: {
        fontSize: colors.h1,
        fontWeight: "700",
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
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
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
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: colors.textColor,
    },
    rowMini: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "20%",
    },
    divider: {
        width: "95%",
        height: 1,
        backgroundColor: colors.secondaryColor,
        marginVertical: 10,
    },
});

export default ImpulseTab;
