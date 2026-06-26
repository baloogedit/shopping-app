import useFetch from "@/hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProductsScreen() {
    const { products } = useLocalSearchParams<{ products: string }>();
    const router = useRouter();

    const { data } = useFetch(
        `https://dummyjson.com/products/category/${products}`,
    );

    const renderProduct = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.navigate(`/home/product/${item.id}` as any)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.productTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={styles.productBrand}>
                {item.brand || "Unknown Brand"}
            </Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

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
                <Text style={styles.categoryTitle}>{products}</Text>
            </View>

            <FlatList
                data={(data as any)?.products || []}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                renderItem={renderProduct}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#aab9e7",
    },
    header: {
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
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 32,
        fontWeight: "900",
        textTransform: "capitalize",
        color: "#000",
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 60,
    },
    row: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
        marginBottom: 24,
    },
    productCard: {
        flex: 1,
        marginHorizontal: 8,
        alignItems: "center",
        maxWidth: "45%",
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 12,
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 2,
    },
    productBrand: {
        fontSize: 14,
        color: "#5351bd",
        textAlign: "center",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
    },
});
