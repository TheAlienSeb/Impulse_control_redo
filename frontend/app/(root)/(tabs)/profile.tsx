import colors from "../../styles/globalVar";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile: React.FC = () => {
    const router = useRouter();

    return (
        <ScrollView
            contentContainerStyle={(styles.scrollViewContent, styles.container)}
        >
            <Text style={styles.header}>Profile Setting</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.smallText}>Full Name</Text>
                <View style={styles.inputContainerRow}>
                    <Icon name="user" size={15} color={colors.textColor}></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder="Selina Zheng"
                        placeholderTextColor="white"
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <Text style={styles.smallText}>Date of Birth</Text>
                <View style={styles.inputContainerRow}>
                    <Icon
                        name="birthday-cake"
                        size={15}
                        color={colors.textColor}
                    ></Icon>

                    <TextInput
                        style={styles.input}
                        placeholder="11/10/2005"
                        placeholderTextColor="white"
                        secureTextEntry
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <Text style={styles.smallText}>Email Address</Text>
                <View style={styles.inputContainerRow}>
                    <Icon
                        name="envelope"
                        size={15}
                        color={colors.textColor}
                    ></Icon>

                    <TextInput
                        style={styles.input}
                        placeholder="selina.zheng23@myhunter.cuny.edu"
                        placeholderTextColor="white"
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <Text style={styles.smallText}>Password</Text>
                <View style={styles.inputContainerRow}>
                    <Icon name="lock" size={15} color={colors.textColor}></Icon>

                    <TextInput
                        style={styles.input}
                        placeholder="*****"
                        placeholderTextColor="white"
                    />
                    <Icon
                        name="pencil"
                        size={15}
                        color={colors.textColor}
                    ></Icon>
                </View>
                <TouchableOpacity
                    onPress={() => router.replace("/(auth)/sign-up")}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.textColor,
        textAlign: "center",
    },
    scrollViewContent: {
        marginTop: "15%",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    info: {
        fontSize: colors.text,
        marginBottom: 10,
        color: colors.textColor,
        display: "flex",
        textAlign: "center",
    },
    smallText: {
        color: "white",
        fontSize: colors.text,
        fontWeight: "600",
        alignSelf: "flex-start",
        marginLeft: "1%",
    },
    inputContainer: {
        width: "90%",
        alignItems: "center",
        flex: 1,
        padding: 10,
    },
    inputContainerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
        backgroundColor: colors.secondaryColor,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: colors.textColor,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: colors.secondaryColor,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: "white",
        borderWidth: 0,
    },
    buttonStyle: {
        width: "90%",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        borderRadius: 50,
        justifyContent: "center",
        marginTop: 15,
        padding: 10,
    },
    buttonText: {
        color: "white",
        fontSize: colors.text,
        fontWeight: "600",
    },
    spaceBetweenContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
    },
});

export default Profile;
