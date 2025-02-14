import { Stack } from "expo-router";

const postLoginLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="impulse" options={{ headerShown: false }} />
        </Stack>
    );
};

export default postLoginLayout;
