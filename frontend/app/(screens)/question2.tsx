import colors from "../styles/globalVar";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import { FaDesktop } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";

const DATA = [
    {
        fontId: "FaDesktop",
        title: "Technology",
    },
    {
        fontId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Healthcare",
    },
    {
        fontId: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Food",
    },
    {
        fontId: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Education",
    },
    {
        fontId: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Transportation",
    },
    {
        fontId: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Retail",
    },
];
type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
const Question2: React.FC = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>IMPUL$E</Text>
                <Text style={styles.header}>
                    What are your biggest spending expenses?{" "}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // Change the background color of the item on press
                        DATA.map((item) => {
                            if (item.title === "Technology") {
                                return {
                                    ...item,
                                    backgroundColor: colors.secondaryColor,
                                };
                            }
                            return item;
                        });
                    }}
                >
                    <View style={styles.itemContainer}>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                                <Item title={item.title} />
                            )}
                            keyExtractor={(item) => item.fontId}
                        />
                    </View>
                </TouchableOpacity>
                {/* <FontAwesomeIcon icon={faSquareCheck} /> */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("/(screens)/question1");
                    }}
                >
                    <Text style={styles.buttonText}>I'm ready 🡒</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontSize: 50,
        fontWeight: "900",
        marginBottom: 20,
        color: colors.primaryColor,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        overflow: "scroll",
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
    },
    title: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
    },
    button: {
        color: colors.textColor,
        backgroundColor: colors.primaryColor,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonText: {
        color: colors.textColor,
        fontSize: colors.text,
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "85%",
        paddingHorizontal: 20,
    },
    item: {
        backgroundColor: colors.secondaryColor,
        padding: 20,
        fontWeight: 500,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
    },
    itemContainer: {
        display: "flex",
        width: "80%",
        height: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Question2;
