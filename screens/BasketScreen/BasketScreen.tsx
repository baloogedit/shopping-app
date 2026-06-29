import { useCart } from "@/context/CartContext"; // Import our global state!
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BasketScreen() {
    const router = useRouter();

    const { cartItems, updateQuantity } = useCart();

    const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0,
    );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                </Text>

                <View style={styles.priceAndQuantityRow}>
                    <Text style={styles.itemPrice}>${item.price}</Text>

                    <View style={styles.quantityBox}>
                        <TouchableOpacity
                            onPress={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                        >
                            <Text style={styles.quantityBtn}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                        >
                            <Text style={styles.quantityBtn}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <Text style={styles.header}>My Basket</Text>

                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>Your basket is empty!</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </ScrollView>
            <View style={styles.bottomBar}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        cartItems.length === 0 && { opacity: 0.5 },
                    ]}
                    disabled={cartItems.length === 0}
                    onPress={() => router.push("/checkout")}
                >
                    <Text style={styles.checkoutButtonText}>
                        Proceed to Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: { paddingBottom: 150 },
    container: { flex: 1, backgroundColor: "#aab9e7", paddingTop: 60 },
    header: {
        fontSize: 28,
        fontWeight: "900",
        color: "#202841",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: "#202841",
        textAlign: "center",
        marginTop: 50,
        fontWeight: "bold",
    },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    cartItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        alignItems: "center",
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
    },
    itemDetails: { flex: 1, marginLeft: 15, marginRight: 10 },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#202841",
        marginBottom: 5,
    },
    itemPrice: { fontSize: 16, fontWeight: "bold", color: "#5351bd" },
    priceAndQuantityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    quantityBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#aab9e7",
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    quantityBtn: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#202841",
        paddingHorizontal: 8,
    },
    quantityText: {
        fontWeight: "bold",
        color: "#202841",
        marginHorizontal: 8,
        fontSize: 16,
    },

    bottomBar: {
        backgroundColor: "#fff",
        padding: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        alignItems: "center",
    },
    totalText: { fontSize: 18, color: "#656565", fontWeight: "bold" },
    totalPrice: { fontSize: 24, fontWeight: "900", color: "#202841" },
    checkoutButton: {
        backgroundColor: "#202841",
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
    },
    checkoutButtonText: { color: "#f0f0f0", fontSize: 18, fontWeight: "bold" },
});
