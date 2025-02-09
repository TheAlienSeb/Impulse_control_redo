import { Text } from "react-native";
import { Redirect } from "expo-router";

const Home = () => {
    <Text style={{ color: "#fff" }}>Test!</Text>;
    return <Redirect href="/(auth)/welcome" />;
};

export default Home;
