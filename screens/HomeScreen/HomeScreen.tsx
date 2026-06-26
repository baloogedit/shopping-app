import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
    const { data } = useFetch("https://dummyjson.com/products/category-list");

    const router = useRouter();

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/home/${item}` as any)}
            >
                <View style={styles.cardInner}>
                    <Text style={styles.cardText}>{item}</Text>
                    <View style={styles.circle} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList data={data} renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#aab9e7",
    },
    centerSpacing: {
        marginTop: 50,
    },
    card: {
        backgroundColor: "#202841",
        marginHorizontal: 30,
        marginVertical: 15,
        borderWidth: 3,
        borderRadius: 30,
        overflow: "hidden",
    },
    cardInner: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    cardText: {
        textTransform: "capitalize",
        fontSize: 25,
        color: "white",
        fontWeight: "900",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#38456a",
        opacity: 0.8,
        borderWidth: 5,
        borderColor: "#9999ee",
    },
    errorText: {
        color: "red",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
    },
});
