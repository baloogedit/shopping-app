import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <CartProvider>
            <SafeAreaView style={styles.safeArea}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="checkout"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="review"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </SafeAreaView>
        </CartProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#7587bd",
    },
});
