import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                console.log('Stored user:', storedUser); // Debug log
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    router.replace('/(auth)/sign-in');
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('user');
            Alert.alert('Logged out', 'You have been signed out.');
            router.replace('/(auth)/sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'An error occurred while signing out.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0369A1" style={{ flex: 1, justifyContent: 'center' }} />;
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
                    {/* Sign Out Button */}
                    <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
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
        backgroundColor: 'red', // Ensure the button is visible
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
