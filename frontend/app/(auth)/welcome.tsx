// import { CurrentRenderContext } from '@react-navigation/native';
import { View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router"
import Swiper from 'react-native-swiper'
import React, { useRef, useState } from 'react';

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', alignItems: 'center' }}> 
            <TouchableOpacity 
                onPress={() => {
                    router.replace('/(auth)/sign-up')
                }}
                style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}
            >
                <Text style={{color: "black", fontWeight: "400" }}>Skip</Text>
            </TouchableOpacity>
        
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
        </SafeAreaView>
    );
};

export default Onboarding;