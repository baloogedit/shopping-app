import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // Prevents saving the empty array before loading finishes

    // 1. LOAD CART FROM STORAGE ON STARTUP
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem("@cart_items");
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error("Failed to load cart from storage:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadCart();
    }, []);

    // 2. SAVE CART TO STORAGE WHENEVER IT CHANGES
    useEffect(() => {
        if (isLoaded) {
            const saveCart = async () => {
                try {
                    await AsyncStorage.setItem("@cart_items", JSON.stringify(cartItems));
                } catch (error) {
                    console.error("Failed to save cart to storage:", error);
                }
            };
            saveCart();
        }
    }, [cartItems, isLoaded]);

    const addToCart = (product: any, quantity: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id,
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }

            return [...prevItems, { ...product, quantity }];
        });
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== id),
            );
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);