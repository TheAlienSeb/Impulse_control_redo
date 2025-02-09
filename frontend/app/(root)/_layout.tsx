import { Stack } from "expo-router";

const postLoginLayout = () => {
    return (
        <Stack>
             <Stack.Screen name="(tabs)" options={ { headerShown: false}}/>
        </Stack>
    )
}

export default postLoginLayout;