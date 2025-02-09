import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../styles/globalVar';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Question3: React.FC = () => {
    const router = useRouter();
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const loadUserEmail = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setEmail(parsedUser.email);
                } else {
                    router.replace('/(auth)/sign-in');
                }
            } catch (error) {
                console.error('Error loading user email:', error);
            }
        };

        loadUserEmail();
    }, []);

    const handleIncrement = () => {
        setMonthlyIncome(monthlyIncome + 100);
    };

    const handleDecrement = () => {
        if (monthlyIncome > 0) {
            setMonthlyIncome(monthlyIncome - 100);
        }
    };

    const handleContinue = async () => {
        if (monthlyIncome > 0) {
            try {
                const response = await axios.put('http://localhost:5000/api/updateBalance', {
                    email,
                    balance: monthlyIncome,
                });
                if (response.data.success) {
                    Alert.alert('Success', `Your monthly income is updated to $${monthlyIncome}`);
                    router.replace('../(root)/accountCreated'); // Replace with the actual card tab route
                } else {
                    Alert.alert('Error', response.data.error);
                }
            } catch (error) {
                console.error('Error updating balance:', error);
                Alert.alert('Error', 'An error occurred while updating your balance');
            }
        } else {
            Alert.alert('Error', 'Please enter a valid amount');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>How much are you making monthly?</Text>
            <Text style={styles.label}>Monthly Income</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={handleDecrement}>
                    <Icon name="minus" size={24} color={colors.primaryColor} />
                </TouchableOpacity>
                <View style={styles.inputWrapper}>
                    <Text style={styles.dollarSign}>$</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={monthlyIncome.toString()}
                        onChangeText={(text) => setMonthlyIncome(parseInt(text) || 0)}
                    />
                </View>
                <TouchableOpacity onPress={handleIncrement}>
                    <Icon name="plus" size={24} color={colors.primaryColor} />
                </TouchableOpacity>
            </View>
            <View style={styles.blueLine} />
            <Text style={styles.incomeText}>I make ${monthlyIncome} monthly</Text>
            <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textColor,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: colors.textColor,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryColor,
        marginHorizontal: 10,
    },
    dollarSign: {
        fontSize: 18,
        color: colors.primaryColor,
    },
    input: {
        fontSize: 18,
        color: colors.primaryColor,
        textAlign: 'center',
        width: 100,
    },
    blueLine: {
        width: '100%',
        height: 2,
        backgroundColor: colors.primaryColor,
        marginVertical: 20,
    },
    incomeText: {
        fontSize: 18,
        color: colors.textColor,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    continueButtonText: {
        fontSize: 18,
        color: colors.textColor,
    },
});

export default Question3;