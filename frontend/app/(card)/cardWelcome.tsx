import colors from "../styles/globalVar";
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Import the image

const CardWelcomeTab: React.FC = () => {
    const router = useRouter();

    // Create an animated value for translateY
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Create a continuous loop animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 10, // move down by 10
                    duration: 500, // duration for this movement
                    useNativeDriver: true, // improves performance
                }),
                Animated.timing(translateY, {
                    toValue: 0, // return back to the original position
                    duration: 700, // duration for this movement
                    useNativeDriver: true, // improves performance
                }),
            ])
        ).start(); // Start the loop animation
    }, [translateY]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.header}>
                    Create your Smart Save Card today!
                </Text>
                <Text style={styles.info}>
                    Make budget planning easier with our Smart Save Card.
                </Text>
                <Animated.Image
                    source={require("../../assets/images/creditcard.png")}
                    style={[
                        styles.image,
                        {
                            transform: [
                                {
                                    translateY: translateY,
                                },
                            ],
                        },
                    ]}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("/cardMenu");
                    }}
                >
                    <Text style={styles.buttonText}>Create your card now</Text>
                </TouchableOpacity>
            </View>
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
        textAlign: "center",
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
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: colors.textColor,
        fontSize: colors.text,
        fontWeight: "bold",
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
    image: {
        width: 350,
        height: 200,
        marginTop: 20,
        marginBottom: 20,
    },
});

export default CardWelcomeTab;
