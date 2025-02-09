import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";

// Importing images using import statement
import confettiBackground from '../../assets/images/confetti_background4.png';
import logo from '../../assets/images/logo.png';

const accountCreated = () => {
    return (
        <ImageBackground
            source={confettiBackground} 
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.logoContainer}>
                <ImageBackground 
                    source={logo} 
                    style={styles.logo}
                />
                <Text style={styles.text}>You're all set!</Text>
                <TouchableOpacity 
                    onPress={() => router.replace('/(auth)/sign-up')}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>See Dashboard</Text> 
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

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

export default accountCreated;
