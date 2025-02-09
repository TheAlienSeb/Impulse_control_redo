import colors from "../styles/globalVar";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DATA = [
    {
        fontId: "desktop",
        title: "Technology",
    },
    {
        fontId: "hospital-o",
        title: "Healthcare",
    },
    {
        fontId: "apple",
        title: "Food",
    },
    {
        fontId: "book",
        title: "Education",
    },
    {
        fontId: "bus",
        title: "Transportation",
    },
    {
        fontId: "diamond",
        title: "Retail",
    },
];

type ItemProps = { title: string; backgroundColor: string; fontId: string };

const Item = ({ title, backgroundColor, fontId }: ItemProps) => (
    <View style={[styles.item, { backgroundColor }]}>
        <Icon
            name={fontId}
            size={25}
            color={colors.textColor}
            style={{ paddingBottom: 5 }}
        />
        <Text style={styles.title}>{title}</Text>
    </View>
);

const Question2: React.FC = () => {
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // Track multiple selected items

    const handleItemPress = (fontId: string) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(fontId)) {
                // If item is already selected, remove it
                return prevSelectedItems.filter((item) => item !== fontId);
            } else {
                // If item is not selected, add it
                return [...prevSelectedItems, fontId];
            }
        });
    };

    const handleUpdateBiggestSpendingExpenses = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const response = await axios.put(
                    "http://localhost:5000/api/updateBiggestSpendingExpenses",
                    {
                        email: parsedUser.email,
                        biggestSpendingExpenses: selectedItems,
                    }
                );

                if (response.data.success) {
                    // Update the user data in AsyncStorage
                    parsedUser.biggestSpendingExpenses = selectedItems;
                    await AsyncStorage.setItem(
                        "user",
                        JSON.stringify(parsedUser)
                    );
                    Alert.alert(
                        "Success",
                        "Biggest spending expenses updated successfully!"
                    );
                    router.replace("../(root)/accountCreated");
                } else {
                    Alert.alert(
                        "Error",
                        response.data.error ||
                            "Something went wrong. Please try again."
                    );
                }
            } else {
                router.replace("/(auth)/sign-in");
            }
        } catch (error) {
            console.error("Error updating biggest spending expenses:", error);
            Alert.alert(
                "Error",
                error.response?.data?.message ||
                    "Failed to update biggest spending expenses."
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>$MART $AVE</Text>

                <Text style={styles.header}>
                    What are your biggest spending expenses?{" "}
                </Text>
                <ScrollView contentContainerStyle={styles.itemContainer}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleItemPress(item.fontId)}
                            >
                                <Item
                                    title={item.title}
                                    backgroundColor={
                                        selectedItems.includes(item.fontId)
                                            ? colors.primaryColor
                                            : colors.secondaryColor
                                    } // Apply color based on selection
                                    fontId={item.fontId}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.fontId}
                    />
                </ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleUpdateBiggestSpendingExpenses}
                >
                    <Text style={styles.buttonText}>I'm ready 🡒</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontSize: colors.h1,
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
        textAlign: "center",
    },
    title: {
        fontSize: 18, // Set a numeric value for fontSize
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
        marginTop: 20,
    },
    buttonText: {
        color: colors.textColor,
        fontSize: 18, // Set a numeric value for fontSize
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "85%",
        paddingHorizontal: 20,
        textAlign: "center",
    },
    item: {
        backgroundColor: colors.secondaryColor,
        padding: 20,
        paddingHorizontal: 90,
        fontWeight: "500",
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        justifyContent: "flex-start",
    },
    itemContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Question2;
