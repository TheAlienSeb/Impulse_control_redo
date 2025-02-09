import colors from "../styles/globalVar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const FinanceTab: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>$MART $AVE</Text>
                <Text style={styles.header}>
                    Let’s fully set up your account!
                </Text>
                <Text style={styles.info}>
                    First, let’s take a quick financial assessment test before
                    opening your account.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("/question1");
                    }}
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
        textAlign: "center",
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
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
        textAlign: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
});

export default FinanceTab;
