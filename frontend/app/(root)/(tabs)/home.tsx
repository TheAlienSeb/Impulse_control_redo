import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); // Set user data from AsyncStorage
                } else {
                    router.replace('/(auth)/sign-in'); // Redirect to sign-in if no user session found
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
            setLoading(false); // Stop loading once session check is complete
        };

        loadUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('user'); // Clear user session
            Alert.alert('Logged out', 'You have been signed out.');
            router.replace('/(auth)/sign-in'); // Redirect to sign-in page
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'An error occurred while signing out.');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>; // You can replace this with a loading spinner if needed
    }

    return (
        <ImageBackground 
            source={require('../../../assets/images/background.png')} 
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <ImageBackground 
                        source={require('../../../assets/images/logo.png')} 
                        style={styles.logo}
                    />
                    <Text style={styles.text}>SmartSave</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Home</Text>
                    {user && (
                        <Text style={styles.userEmail}>Welcome, {user.email}!</Text>
                    )}
                    <TouchableOpacity 
                        onPress={handleSignOut} 
                        style={styles.signOutButton}
                    >
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollViewContent: {
        marginTop: 100,
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    userEmail: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        marginVertical: 10,
    },
    signOutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Home;
