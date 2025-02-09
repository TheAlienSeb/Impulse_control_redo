import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";

const AccountCreated = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds timeout

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/images/confetti_background4.png')}
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.logoContainer}>
                <ImageBackground 
                    source={require('../../assets/images/logo.png')} 
                    style={styles.logo}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0369A1" />
                ) : (
                    <>
                        <Text style={styles.text}>You're all set!</Text>
                        <TouchableOpacity 
                            onPress={() => router.replace('/(tabs)/home')}
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