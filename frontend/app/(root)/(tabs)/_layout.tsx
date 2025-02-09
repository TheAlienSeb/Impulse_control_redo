import { Stack } from "expo-router";

const postLoginLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="accountCreated" options={ { headerShown: false}}/>
        </Stack>
    )
}

export default postLoginLayout;