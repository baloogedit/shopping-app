import useFetch from "@/hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    // Fetch data for just this one product
    const { data, loading, error } = useFetch(
        `https://dummyjson.com/products/${id}`,
    );
    const product: any = data; 

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Details</Text>
                <View style={{ width: 36 }} />{" "}
                
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#000"
                    style={styles.centerSpacing}
                />
            ) : error || !product ? (
                <Text style={styles.errorText}>
                    Failed to load product details.
                </Text>
            ) : (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: product.thumbnail }}
                                style={styles.mainImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.brand}>{product.brand}</Text>
                            <Text style={styles.title}>{product.title}</Text>
                            <Text style={styles.price}>${product.price}</Text>

                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.description}>
                                {product.description}
                            </Text>
                        </View>
                    </ScrollView>

                    {/* Sticky Bottom Action Bar */}
                    <View style={styles.bottomBar}>
                        <TouchableOpacity style={styles.addToCartButton}>
                            <Text style={styles.addToCartText}>
                                Add to Basket
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 10,
    },
    backButton: {
        width: 36,
        height: 36,
        backgroundColor: "#1a1a1a",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    centerSpacing: {
        marginTop: 50,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        fontWeight: "bold",
    },
    scrollContent: {
        paddingBottom: 100, 
    },
    imageBox: {
        width: "100%",
        height: 300,
        backgroundColor: "#f5f5f5",
        marginBottom: 20,
    },
    mainImage: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        paddingHorizontal: 20,
    },
    brand: {
        fontSize: 16,
        color: "#888",
        textTransform: "uppercase",
        fontWeight: "600",
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: "900",
        color: "#000",
        marginBottom: 10,
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    description: {
        fontSize: 16,
        color: "#555",
        lineHeight: 24,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 30, // Pad for bottom screen edge
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    addToCartButton: {
        backgroundColor: "#202841",
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
    },
    addToCartText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
