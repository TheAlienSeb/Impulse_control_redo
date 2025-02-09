import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="finance" options={{ headerShown: false }} />
            <Stack.Screen name="question1" options={{ headerShown: false }} />
            <Stack.Screen name="question2" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
