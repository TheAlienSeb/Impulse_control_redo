import { Text, ScrollView, View, ImageBackground, StyleSheet, TextInput, Button } from 'react-native';


const accountCreated = () => {
    return (
        <ImageBackground
            source={require('../../assets/images/confetti_background.png')} 
            style={styles.background}
            resizeMode='cover'
        >
            <Text></Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})

export default accountCreated;