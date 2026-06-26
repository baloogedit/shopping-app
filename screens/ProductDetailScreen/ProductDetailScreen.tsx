import useFetch from "@/hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
    const { productdetail } = useLocalSearchParams<{ productdetail: string }>();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    const { data, loading, error } = useFetch(
        `https://dummyjson.com/products/${productdetail}`,
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
                <Text style={styles.headerTitle}>{product.title}</Text>
                <View style={{ width: 36 }} />
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
                        style={{ flex: 1 }}
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={styles.brand}>
                                    {product.brand}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.circleButton}
                                        onPress={() => {
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            );
                                        }}
                                    >
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>
                                        {quantity}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.circleButton}
                                        onPress={() => {
                                            setQuantity(
                                                Math.min(
                                                    product.stock,
                                                    quantity + 1,
                                                ),
                                            );
                                        }}
                                    >
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={styles.price}>
                                    ${product.price}
                                </Text>
                                <Text style={styles.available}>
                                    On stock: {product.stock}
                                </Text>
                            </View>
                            <Text style={styles.discount}>
                                Discount: {product.discountPercentage}% (Final
                                price: $
                                {(
                                    product.price -
                                    (product.price *
                                        product.discountPercentage) /
                                        100
                                ).toFixed(2)}
                                )
                            </Text>

                            <View>
                                <Ionicons name="star" size={20} color="gold" />
                                <Text style={styles.reviews}>
                                    Reviews: {product.rating} / 5
                                </Text>
                            </View>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.description}>
                                {product.description}
                            </Text>
                        </View>
                    </ScrollView>
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
        backgroundColor: "#aab9e7",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        width: 36,
        height: 36,
        backgroundColor: "#202841",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        width: "60%",
        textAlign: "center",
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
        paddingBottom: 175,
    },
    imageBox: {
        width: "100%",
        height: 250,
        backgroundColor: "#fff",
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
        color: "#5351bd",
        textTransform: "uppercase",
        fontWeight: "600",
        marginBottom: 4,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    circleButton: {
        height: 36,
        width: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#202841",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#202841",
        lineHeight: 22,
    },
    quantityText: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 20,
        width: 30,
        textAlign: "center",
    },
    available: {
        fontSize: 14,
        fontWeight: "600",
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
    discount: {
        fontSize: 16,
        color: "#ff0000",
        fontWeight: "600",
        marginBottom: 20,
    },
    reviews: {
        fontSize: 16,
        fontWeight: "600",
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
        backgroundColor: "#aab9e7",
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 90,
        borderTopWidth: 1,
        borderTopColor: "#aab9e7",
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
