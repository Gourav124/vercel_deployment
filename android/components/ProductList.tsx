import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const API_URL = 'https://5b2734891ca6.ngrok-free.app';

type Product = {
  id: number;
  name: string;
  image_url: string;
  price: number;
  purchase_price: number;
};

const ProductList = () => {

  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);  // Show all products
      })
      .catch(err => {
        console.log('Failed to load products');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style = {styles.row}>
            <Text style = {styles.price} numberOfLines={1}>₹{item.price}</Text>
            <Text style = {styles.purchase_price} numberOfLines={1}>₹{item.purchase_price}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 8,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#EAF6FB',
    borderRadius: 16,
    padding: 8,
    marginRight: 12,
    width: 140,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf:'flex-start'
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
});

export default ProductList; 