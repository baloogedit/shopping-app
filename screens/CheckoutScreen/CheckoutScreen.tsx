import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CheckoutScreen() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadContactData = async () => {
            try {
                const savedData = await AsyncStorage.getItem("@contact_data");
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    setFullName(parsedData.fullName || "");
                    setPhoneNumber(parsedData.phoneNumber || "");
                    setAddress(parsedData.address || "");
                    setCity(parsedData.city || "");
                    setZipCode(parsedData.zipCode || "");
                    setCardNumber(parsedData.cardNumber || "");
                }
            } catch (error) {
                console.error("Failed to load contact data", error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadContactData();
    }, []);

    // 3. SAVE data automatically whenever the user types something
    useEffect(() => {
        if (isLoaded) {
            const saveContactData = async () => {
                const contactData = { fullName, phoneNumber, address, city, zipCode, cardNumber };
                try {
                    await AsyncStorage.setItem("@contact_data", JSON.stringify(contactData));
                } catch (error) {
                    console.error("Failed to save contact data", error);
                }
            };
            
            saveContactData();
        }
    }, [fullName, phoneNumber, address, city, zipCode, cardNumber, isLoaded]);

    const handleReviewOrder = () => {
        if (!fullName || !address || !city || !cardNumber) {
            Alert.alert(
                "Missing Details",
                "Please fill out all fields.",
            );
            return;
        }

        router.push({
            pathname: "/review",
            params: { fullName, address, city, zipCode, phoneNumber, cardNumber },
        });
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Checkout</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Shipping Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Street Address, Apartment, Suite, etc."
                    placeholderTextColor="#888"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor="#888"
                    value={city}
                    onChangeText={setCity}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Zip Code"
                    placeholderTextColor="#888"
                    value={zipCode}
                    onChangeText={setZipCode}
                />

                <Text style={styles.sectionTitle}>Payment Method</Text>
                <View style={styles.cardContainer}>
                    <Ionicons name="card" size={24} color="#202841" />
                    <TextInput
                        style={styles.cardText}
                        placeholder="**** **** **** ****"
                        placeholderTextColor="#888"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                    />
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#5351bd"
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.reviewButton}
                    onPress={handleReviewOrder}
                >
                    <Text style={styles.orderButtonText}>Review Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#aab9e7" },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 36,
        height: 36,
        backgroundColor: "#202841",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    header: { fontSize: 24, fontWeight: "900", color: "#202841" },

    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#202841",
        marginBottom: 15,
        marginTop: 10,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        marginBottom: 15,
        color: "#202841",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    cardText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: "#202841",
        letterSpacing: 2,
    },
    bottomBar: {
        backgroundColor: "#aab9e7",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    reviewButton: {
        backgroundColor: "#202841",
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
    },
    orderButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
