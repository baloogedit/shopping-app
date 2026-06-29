import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ReviewOrderScreen() {
    const router = useRouter();

    const { fullName, address, city, zipCode, phoneNumber, cardNumber } =
        useLocalSearchParams<{
            fullName: string;
            address: string;
            city: string;
            zipCode: string;
            phoneNumber: string;
            cardNumber: string;
        }>();

    const { cartItems, clearCart } = useCart();

    const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0,
    );

    const handleConfirmOrder = () => {
        Alert.alert("Success!", "Your order has been placed successfully.", [
            {
                text: "OK",
                onPress: () => {
                    clearCart();
                    router.dismissAll();
                    router.replace("/home");
                },
            },
        ]);
    };

    const renderSummaryItem = ({ item }: { item: any }) => (
        <View style={styles.summaryItem}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.summaryImage}
            />
            <View style={styles.summaryDetails}>
                <Text style={styles.summaryTitle} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.summaryPrice}>
                    ${item.price} x{item.quantity}
                </Text>
            </View>
            <Text style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Review Order</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Delivering To:</Text>
                <View style={styles.cardContainer}>
                    <Ionicons name="location" size={24} color="#5351bd" />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.shippingTextBold}>
                            Full Name: {fullName}
                        </Text>
                        <Text style={styles.shippingText}>
                            Phone Number: {phoneNumber}
                        </Text>
                        <Text style={styles.shippingText}>
                            Address: {address}
                        </Text>
                        <Text style={styles.shippingText}>City: {city}</Text>
                        <Text style={styles.shippingText}>
                            Zip Code: {zipCode}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Order Items:</Text>
                <View style={styles.itemsContainer}>
                    {cartItems.map((item: any) => (
                        <View key={item.id}>{renderSummaryItem({ item })}</View>
                    ))}
                </View>

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total to Pay:</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 10,
                            color: "#202841",
                        }}
                    >
                        payment method:{" "}
                        {cardNumber
                            ? `**** **** **** ${cardNumber.slice(-4)}`
                            : "N/A"}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmOrder}
                >
                    <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
                    <Text>
                        {" "}
                        By clicking this button, you agree to our Terms and
                        Conditions.
                    </Text>
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

    scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#202841",
        marginBottom: 10,
        marginTop: 15,
    },

    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 10,
    },
    shippingTextBold: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#202841",
        marginBottom: 4,
    },
    shippingText: { fontSize: 16, color: "#000000", marginBottom: 2 },

    itemsContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    summaryItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 15,
    },
    summaryImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    summaryDetails: { flex: 1, marginLeft: 12 },
    summaryTitle: { fontSize: 14, fontWeight: "bold", color: "#202841" },
    summaryPrice: { fontSize: 14, color: "#888", marginTop: 4 },
    itemTotal: { fontSize: 16, fontWeight: "bold", color: "#5351bd" },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#202841",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    totalLabel: { fontSize: 18, color: "#fff", fontWeight: "bold" },
    totalAmount: { fontSize: 24, fontWeight: "900", color: "#fff" },

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
    confirmButton: {
        backgroundColor: "#5351bd",
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
    },
    confirmButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
