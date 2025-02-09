import { TouchableOpacity } from 'react-native';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TextInput, Button, Alert} from 'react-native';
import { addWhitelistedNativeProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, Redirect } from "expo-router";
import {router} from "expo-router"
import React, { useState } from 'react';
import axios from "axios";


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/createUser', {
                email: username, // Ensure the field names match the backend
                password
            });
    
            // Handle success response
            if (response.status === 201) {
                Alert.alert('Success', 'Account created successfully!');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            Alert.alert('Error', error.response?.data?.message || 'Failed to sign up.');
        }
    };
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
                    <Text style={styles.smallText}>Username</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your email address..." 
                        placeholderTextColor="white"
                        value={username}
                        onChangeText={setUsername} // Capture user input
                    />
                    <Text style={styles.smallText}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your password..." 
                        placeholderTextColor="white"
                        value={password}
                        onChangeText={setPassword} // Capture user input
                        
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            router.replace('/(auth)/sign-in')
                        }}
                    >
                        <Text style={styles.alreadyHaveAccount}>Already have an account? Sign in</Text> 
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
        height: 45,
        borderRadius: 9999,
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
    alreadyHaveAccount: {
        color: '#0369A1'
    },
});

export default SignUp;
