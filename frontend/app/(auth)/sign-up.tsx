import { TouchableOpacity } from 'react-native';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUp = () => {
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
                        placeholderTextColor="#aaa"
                    />
                    <Text style={styles.smallText}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your password..." 
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { /* Handle sign up */ }}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <Text style={styles.alreadyHaveAccount}>I already have an account</Text>
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