import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const API_URL = 'https://5b2734891ca6.ngrok-free.app';

type Deal = {
  id: number;
  name: string;
  price: number;
  purchase_price: number;
};

const DealOfTheDay = () => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/deal-of-the-day`)
      .then(res => res.json())
      .then(data => {
        setDeal(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load deal');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#f39c12" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!deal) {
    return <Text style={styles.error}>No deal found</Text>;
  }

  const discountPercent = deal.purchase_price && deal.price
    ? Math.round(((deal.purchase_price - deal.price) / deal.purchase_price) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.dealTitle}>DEAL OF THE DAY</Text>
      <Text style={styles.productTitle}>{deal.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{deal.price}</Text>
        <Text style={styles.strikePrice}>₹{deal.purchase_price}</Text>
        <Text style={styles.discount}>{discountPercent}% off</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF2E0',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dealTitle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 12,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 12,
    fontSize: 16,
  },
  discount: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default DealOfTheDay; 