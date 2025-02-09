import colors from "../styles/globalVar";
import React, { useState } from "react"; // Import useState
import { router } from "expo-router";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const DATA = [
    {
        fontId: "faDesktop",
        title: "Technology",
    },
    {
        fontId: "faBriefcaseMedical",
        title: "Healthcare",
    },
    {
        fontId: "faHotdog",
        title: "Food",
    },
    {
        fontId: "faSchool",
        title: "Education",
    },
    {
        fontId: "faBusAlt",
        title: "Transportation",
    },
    {
        fontId: "faTshirt",
        title: "Retail",
    },
];

type ItemProps = { title: string; backgroundColor: string; fontId: string };

const Item = ({ title, backgroundColor, fontId }: ItemProps) => (
    <View style={[styles.item, { backgroundColor }]}>
        <Icon name={fontId} size={30} color={colors.textColor} />
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
                                fontId={item.fontId}
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
    },
    item: {
        backgroundColor: colors.secondaryColor,
        padding: 20,
        fontWeight: "500",
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flexWrap: "wrap",
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
