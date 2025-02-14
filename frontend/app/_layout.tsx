// import {
//     DarkTheme,
//     DefaultTheme,
//     ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        async function hideSplashScreen() {
            await SplashScreen.hideAsync();
        }
        hideSplashScreen();
    }, []);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="(card)" options={{ headerShown: false }} />
        </Stack>
    );
}
