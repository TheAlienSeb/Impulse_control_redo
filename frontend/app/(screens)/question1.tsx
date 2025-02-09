import colors from "../styles/globalVar";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";

const Question1: React.FC = () => {
    const [number, onChangeNumber] = React.useState("");
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>IMPUL$E</Text>
                <Text style={styles.header}>What is your full name?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Enter your name"
                    keyboardType="numeric"
                />
                <Text style={styles.info}>
                    For security and regulatory purposes, please enter name
                    based on your real ID.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("/screens/question2");
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
