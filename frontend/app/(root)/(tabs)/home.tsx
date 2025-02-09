import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
import { BarChart } from 'react-native-chart-kit'; // Import BarChart
import { Dimensions } from 'react-native';

// Import images using require syntax
const backgroundImage = require('../../../assets/images/background.png');
const logoImage = require('../../../assets/images/logo.png');
const profileIcon = require('../../../assets/images/pfpicon.png'); // Add your profile icon image here

const screenWidth = Dimensions.get('window').width;

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                console.log('Stored user:', storedUser); // Debug log
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    // Check if fullName is empty, biggestSpendingExpenses is an empty array, or budget is 0
                    if (!parsedUser.fullName || parsedUser.biggestSpendingExpenses.length === 0 || parsedUser.balance === 0) {
                        router.replace('../../(screens)/finance');
                        return;
                    }
                 } 
                // else {
                //     router.replace('/(auth)/sign-in');
                // }
            } catch (error) {
                console.error('Error loading user:', error);
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('user');
            Alert.alert('Logged out', 'You have been signed out.');
            router.replace('/(auth)/sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'An error occurred while signing out.');
        }
    };

    const handleCardRedirect = () => {
        if (user && user.card && user.card.cardNumber) {
            router.replace('/cardMenu');
        } else {
            router.replace('/cardWelcome');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0369A1" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    const defaultTransactions = [
        { description: 'Grocery Shopping', date: '2025-02-01', amount: 50 },
        { description: 'Electricity Bill', date: '2025-02-05', amount: 75 },
        { description: 'Internet Bill', date: '2025-02-10', amount: 60 },
    ];

    const transactionsToDisplay = user && user.transactions && user.transactions.length > 0
        ? user.transactions.slice(0, 3)
        : defaultTransactions;

    const data = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                data: [200, 450, 280, 800],
            },
        ],
    };

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.background}
        >
            <SafeAreaView style={styles.navBar}>
                <View style={styles.navContent}>
                    <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.profileButton}>
                        <Image source={profileIcon} style={styles.profileIcon} />
                    </TouchableOpacity>
                    <View style={styles.textContainerTwo}>
                        <Text style={styles.textSmall}>Morning, John</Text>
                        <MaterialCommunityIcons name="crown" size={20} color="gold" style={styles.crownIcon} />
                    </View>
                </View>
                <View style={styles.roundedContainer}>
                    <MaterialCommunityIcons name="credit-card" size={20} color="black" style={styles.creditCardIcon} />
                    <Text style={styles.roundedContainerText}>Personal - 6693 </Text> /* Add your card number here */
                </View>
                <View style={styles.textContainer}>
                        <Text style={styles.text}>$103</Text>
                        <Text style={styles.textSmall}>monthly spend</Text>
                </View>
                <View style={styles.cardButtonContainer}>
                    <TouchableOpacity onPress={handleCardRedirect} style={styles.cardButton}>
                        <MaterialCommunityIcons name="credit-card" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.cardButtonText}>See Card</Text>
                </View>
            </SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.sectionTitle}>Latest Transactions</Text>
                <View style={styles.transactionsContainer}>
                    <View style={styles.transactionTable}>
                        {transactionsToDisplay.map((transaction, index) => (
                            <View key={index} style={styles.transactionRow}>
                                <View style={styles.transactionDetails}>
                                    <Text style={styles.transactionText}>{transaction.description}</Text>
                                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                                </View>
                                <Text style={styles.transactionAmount}>${transaction.amount}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.chartContainer}>
                    <Text style={styles.sectionTitleMonthlySpending}>Monthly Spending</Text>
                    <BarChart
                        style={styles.chart}
                        data={data}
                        width={screenWidth - 40}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: '#1F2937', // Midnight Blue
                            backgroundGradientFrom: '#1F2937', // Midnight Blue
                            backgroundGradientTo: '#1F2937', // Midnight Blue
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726',
                            },
                        }}
                        verticalLabelRotation={0}
                    />
                </View>
                <SafeAreaView>
                    
                </SafeAreaView>
                <View style={styles.container}>
                    {/* <Text style={styles.heading}>Home</Text> */}
                    {user && (
                        <Text style={styles.userEmail}>Welcome, {user.email}!</Text>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    navBar: {
        height: 400, // Set the height of the nav bar
        backgroundColor: '#6495ED',
        justifyContent: 'flex-start', // Align items at the top
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10, // Add padding to position content at the top
        paddingHorizontal: 16,
    },
    profileButton: {
        padding: 10,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 30,
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginLeft: 0,
    },
    textContainerTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginLeft: 0,
    },
    crownIcon: {
        marginLeft: 5,
    },
    roundedContainer: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: 'transparent', // Light Blue
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    creditCardIcon: {
        marginRight: 10,
    },
    roundedContainerText: {
        color: '#000', // Black text color
        fontSize: 16,
        fontWeight: '500',
    },
    navButton: {
        backgroundColor: 'red',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    navButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    scrollViewContent: {
        marginTop: 100,
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    transactionsContainer: {
        width: '90%',
        marginTop: 20,
        backgroundColor: '#1F2937', // Light gray background for the transactions container
        borderRadius: 10,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    sectionTitleMonthlySpending: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    transactionTable: {
        width: '100%',
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    transactionDetails: {
        flexDirection: 'column',
    },
    transactionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionDate: {
        color: 'gray',
        fontSize: 14,
    },
    transactionAmount: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chartContainer: {
        width: '90%',
        marginTop: 20,
    },
    chart: {
        borderRadius: 16,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100, 
        height: 100,
        marginBottom: 20, 
    },
    text: {
        color: 'white', 
        fontSize: 40,
        fontWeight: '600',
    },
    textSmall: {
        color: 'white', 
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 10,
    },
   container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    userEmail: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        marginVertical: 10,
    },
    cardButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    cardButton: {
        backgroundColor: '#0369A1',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center', // Center the text
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Home;