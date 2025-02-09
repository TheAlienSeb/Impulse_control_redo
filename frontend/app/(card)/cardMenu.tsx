import colors from "../styles/globalVar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const CardMenuTab: React.FC = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.header}>$250.00</Text>
                <Text style={styles.info}>Available to spend.</Text>
                <Image
                    source={require("../../assets/images/cardbg.jpg")}
                    style={styles.image}
                ></Image>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("/question2");
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
    image: {
        transform: [{ rotate: "90deg" }],
        marginBottom: 60,
        marginTop: 60,
        height: 200,
        width: 300,
        borderRadius: 20,
    },
});

export default CardMenuTab;
