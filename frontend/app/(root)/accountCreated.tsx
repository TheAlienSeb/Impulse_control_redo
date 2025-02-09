import React, { useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";

const AccountCreated = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(root)/(tabs)/home');
        }, 3000); // 3 seconds timeout

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/images/confetti_background.png')}
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0369A1" />
                <Text style={styles.text}>Account Created Successfully!</Text>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#0369A1',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default AccountCreated;