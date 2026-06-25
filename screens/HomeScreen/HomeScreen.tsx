import useFetch from "@/hooks/useFetch";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen() {
    
    const { data }= useFetch("https://dummyjson.com/products/category-list");


    const renderItem = ({ item } : {item: any}) => {
        return (
            <TouchableOpacity style={{margin:30, borderWidth:3 }} >
                <View>
                    <Text
                        style={{
                            fontSize:25,
                            color:"green",
                            fontWeight:"900",
                        }}
                    >
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    
    
    return (
        <View> 
            <FlatList data={data} renderItem={renderItem} />
        </View>
    );
}