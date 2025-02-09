import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="cardWelcome" options={{ headerShown: false }} />
            <Stack.Screen name="cardMenu" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
