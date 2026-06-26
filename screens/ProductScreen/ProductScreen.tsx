import useFetch from "@/hooks/useFetch";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function ProductScreen() {
    
    return (
        <View style={styles.container}>
            <Text>
                Hello from the Product Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                   
        backgroundColor: '#aab9e7', 
    }
});