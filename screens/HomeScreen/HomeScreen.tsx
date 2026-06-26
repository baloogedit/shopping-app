import useFetch from "@/hooks/useFetch";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function HomeScreen() {

    const { data } = useFetch("https://dummyjson.com/products/category-list");

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity style={
                {
                    backgroundColor: "lightgray",
                    margin: 30,
                    borderWidth: 3,
                    borderRadius: 10,
                }}
            >
                <View>
                    <Text
                        style={{
                            textTransform: "capitalize",
                            fontSize: 25,
                            color: "black",
                            fontWeight: "900",
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