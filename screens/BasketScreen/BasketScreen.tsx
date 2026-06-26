import { View, Text, StyleSheet } from 'react-native';

export default function BasketScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your Basket</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aab9e7', // Adjust to match your theme
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});