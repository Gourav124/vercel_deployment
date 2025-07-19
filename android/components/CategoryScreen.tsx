import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import type { RouteProp } from '@react-navigation/native';


const API_URL = 'https://5b2734891ca6.ngrok-free.app';

 type RootStackParamList = {
   Home: undefined;
   CategoryScreen: { category: string };
 };

type CategoryScreenProps = {
  route: RouteProp<RootStackParamList, 'CategoryScreen'>;
};

type Product = {
  id: number;
  name: string;
  image_url?: string;
  price?: number;
  purchase_price: number;
};

const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const { category } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = category === 'All'
      ? `${API_URL}/products`
      : `${API_URL}/products?category=${encodeURIComponent(category)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [category]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#f39c12" style={{ marginTop: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
        <FlatList
        numColumns={2}
          data={products}
          keyExtractor={item => item.id?.toString() || item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.image} />
              )}
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <View style = {styles.row}>
              {item.price !== undefined && (
                <Text style={styles.price}>₹{item.price}</Text>
              )}
              <Text style={styles.purchase_price}>₹{item.purchase_price}</Text>
               </View>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   // backgroundColor: '#FFF2E0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 16,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  card: {
    maxWidth:'30%',
    backgroundColor: '#EAF6FB',
    borderRadius: 16,
    padding: 8,
    marginRight: 25,
    marginTop:12,
    width: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'contain'
  },
 
  name: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf:'center'
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf:'flex-start'
  },
  purchase_price: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '500',
    color:'#636e72',
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CategoryScreen; 