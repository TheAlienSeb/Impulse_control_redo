import colors from "../styles/globalVar";
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ActivityIndicator,
} from "react-native";
import { useRouter, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CardWelcomeTab: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create an animated value for translateY
    const translateY = useRef(new Animated.Value(0)).current;

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
            setLoading(false);
        };

        loadUser();

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

    const handleCreateCard = () => {
        if (user && user.card && user.card.cardNumber) {
            router.replace("/cardMenu");
        } else {
            router.replace("/cardCreate");
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0369A1" style={{ flex: 1, justifyContent: 'center' }} />;
    }

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
                    onPress={handleCreateCard}
                >
                    <Text style={styles.buttonText}>Create your card now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        height: "70%",
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
