// import { CurrentRenderContext } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router"
import Swiper from 'react-native-swiper'
import React, { useRef, useState } from 'react';
// Import images
const backgroundImage = require("../../assets/images/background.png");
const logoImage  =  require('../../assets/images/logo.png');

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}> 
            <TouchableOpacity 
                onPress={() => {
                    router.replace('/(auth)/sign-up')
                }}
                style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end', padding: 0 }}
            >
                <ImageBackground source={backgroundImage} style={styles.background}>
                <View style={styles.logoContainer}>
                            <ImageBackground
                                source={require("../../assets/images/logo.png")}
                                style={styles.logo}
                            />
                            <Text style={styles.text}>SmartSave</Text>
                            <Text style={styles.info}>Click anywhere to start.</Text>
                        </View>
        <Swiper 
            ref={swiperRef}
            loop={false}
            dot={<View style={{ width: 32, height: 4, margin: 1, backgroundColor: "#E2E8F0"}}/>}
            activeDot={<View style={{ width: 32, height: 4, margin: 1, backgroundColor: "#0286FF", borderRadius: 9999}}/>}
            onIndexChanged={(index) => setActiveIndex(index)}
        >    
            [{
            }]
        </Swiper>
        </ImageBackground></TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        display: "flex",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
        marginTop:"120%",
    },
    text: {
        color: "white",
        fontSize: 50,
        fontWeight: "600",
    },
    info:{
        color: "white",
        fontSize: 20,
        fontWeight: "200",
        marginTop:"50%",
    }
});

export default Onboarding;