import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#9999ee",
                tabBarStyle: { backgroundColor: "#202841"},
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="basket"
                options={{
                    title: "Basket",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen name="index" options={{ href: null }} />
        </Tabs>
    );
}
