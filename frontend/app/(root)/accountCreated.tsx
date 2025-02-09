import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert} from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountCreated = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds timeout

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    const handleSeeDashboard = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Update the user data in AsyncStorage to ensure all fields are filled
                await AsyncStorage.setItem('user', JSON.stringify({
                    ...parsedUser,
                    fullName: parsedUser.fullName || 'Default Name',
                    biggestSpendingExpenses: parsedUser.biggestSpendingExpenses.length > 0 ? parsedUser.biggestSpendingExpenses : ['Default Expense'],
                    balance: parsedUser.balance || 100,
                }));
                router.replace('/(tabs)/home');
            } else {
                router.replace('/(auth)/sign-in');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            Alert.alert('Error', 'An error occurred while updating your data.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/confetti_background4.png')}
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../../assets/images/logo.png')} 
                    style={styles.logo}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0369A1" />
                ) : (
                    <>
                        <Text style={styles.text}>You're all set!</Text>
                        <TouchableOpacity 
                            onPress={handleSeeDashboard}
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.buttonText}>See Dashboard</Text> 
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, 
        height: 100,
        marginBottom: 20, 
    },
    text: {
        color: 'white', 
        fontSize: 50,
        fontWeight: '600',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttonStyle: {
        width: '20%',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#0369A1',
        height: 45,
        borderRadius: 9999,
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
    },
});

export default AccountCreated;