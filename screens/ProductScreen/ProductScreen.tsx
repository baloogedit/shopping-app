import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useFetch from '@/hooks/useFetch';

export default function ProductsScreen() {
  // Extract the category name from the dynamic route
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  
  // Fetch products for the specific category
  const { data } = useFetch(`https://dummyjson.com/products/category/${category}`);

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.productImage} 
          resizeMode="cover" 
        />
      </View>
      {/* numberOfLines={1} truncates long names just like the mockup */}
      <Text style={styles.productTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.productBrand}>{item.brand || 'Unknown Brand'}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Hide the default Expo Router header to use our custom UI */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header matching the mockup */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{category}</Text>
      </View>

      {/* 2-Column Grid */}
      <FlatList
        data={data?.products || []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust this based on your safe area needs
    paddingBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: '#1a1a1a',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'capitalize',
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  productCard: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    maxWidth: '45%', // Ensures cards don't stretch too wide
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
  },
});