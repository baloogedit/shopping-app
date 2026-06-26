import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

    const { data } = useFetch("https://dummyjson.com/products/category-list");

    const router = useRouter();


    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity style={
                {
                    backgroundColor: "#202841",
                    margin: 30,
                    borderWidth: 3,
                    borderRadius: 30,

                }}
                onPress={() => router.push(
                {
                    pathname: "/home/[products]" as any,
                    params: { products: item },
                })}
            >
                <View>
                    <Text
                        style={{
                            textTransform: "capitalize",
                            fontSize: 25,
                            color: "white",
                            fontWeight: "900",
                            margin: 10,
                        }}
                    >
                        {item}
                    </Text>
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
        backgroundColor: '#aab9e7', 
    }
});