import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TextInput, Alert } from 'react-native';
import { router } from "expo-router";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(true); // Tracks if session is being checked

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    router.replace('/home'); // Redirect if user is already signed in
                    return;
                }
            } catch (error) {
                console.error('Error checking user session:', error);
            }
            setLoading(false); // Stop loading once check is complete
        };

        checkUserSession();
    }, []);

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/signin', {
                email: userEmail,
                password: userPassword
            });

            const userData = response.data.user;
            await AsyncStorage.setItem('user', JSON.stringify(userData)); // Store session
            Alert.alert('Success', 'Signed in successfully!');
            router.replace('../(root)/(tabs)/home'); // Redirect to home
            
        } catch (error) {
            console.error('Signin error:', error.response?.data || error.message);
            Alert.alert('Error', 'Invalid credentials');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0369A1" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <ImageBackground 
            source={require('../../assets/images/background.png')} 
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <ImageBackground 
                        source={require('../../assets/images/logo.png')} 
                        style={styles.logo}
                    />
                    <Text style={styles.text}>SmartSave</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.smallText}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your email address..." 
                        placeholderTextColor="white"
                        value={userEmail}
                        onChangeText={setUserEmail}
                    />
                    <Text style={styles.smallText}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your password..." 
                        placeholderTextColor="white"
                        secureTextEntry
                        value={userPassword}
                        onChangeText={setUserPassword}
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => router.replace('/(auth)/sign-up')}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.buttonText}>Create New Account</Text> 
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
    smallText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginLeft: '1%',
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#1F2937',
        borderRadius: 9999,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: 'white',
    },
    buttonStyle: {
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#0369A1',
        height: 55,
        borderRadius: 9999,
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
});

export default SignIn;