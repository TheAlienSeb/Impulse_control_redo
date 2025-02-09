import colors from "../styles/globalVar";
import React, { useState } from "react"; // Import useState
import {router} from "expo-router"

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
    {
        fontId: "FaDesktop",
        title: "Technology",
    },
    {
        fontId: "FaBriefcaseMedical",
        title: "Healthcare",
    },
    {
        fontId: "FaHotdog",
        title: "Food",
    },
    {
        fontId: "FaSchool",
        title: "Education",
    },
    {
        fontId: "FaBusAlt",
        title: "Transportation",
    },
    {
        fontId: "FaTshirt",
        title: "Retail",
    },
];

type ItemProps = { title: string; backgroundColor: string };

const Item = ({ title, backgroundColor }: ItemProps) => (
    <View style={[styles.item, { backgroundColor }]}>
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spaceBetweenContainer}>
                <Text style={styles.logo}>IMPUL$E</Text>
                <Text style={styles.header}>
                    What are your biggest spending expenses?{" "}
                </Text>
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
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.fontId}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.replace("../(root)/accountCreated");
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
        width: 200,
    },
    itemContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

// Custom scrollbar styles
const globalStyles = `
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: ${colors.backgroundColor};
    }
    ::-webkit-scrollbar-thumb {
        background: ${colors.primaryColor};
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${colors.primaryColor};
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Question2;
