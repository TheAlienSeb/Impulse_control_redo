import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/globalVar';

const FinanceTab: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    // Check if fullName is empty, biggestSpendingExpenses is an empty array, or budget is 0
                    if (!parsedUser.fullName) {
                        router.replace('/question1');
                        return;
                    } else if (parsedUser.biggestSpendingExpenses.length === 0) {
                        router.replace('/question2');
                        return;
                    } else if (parsedUser.balance === 0) {
                        router.replace('/question3');
                        return;
                    } else {
                        router.replace('/accountCreation'); // Replace with the actual account creation route
                    }
                } else {
                    router.replace('/(auth)/sign-in');
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };

        loadUser();
    }, []);

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
                    <Text style={styles.buttonText}>Start Assessment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        padding: 20,
    },
    spaceBetweenContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '90%',
        paddingHorizontal: 20,
        marginTop: 60,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primaryColor,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textColor,
        marginBottom: 20,
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        color: colors.textColor,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: colors.textColor,
    },
});

export default FinanceTab;
