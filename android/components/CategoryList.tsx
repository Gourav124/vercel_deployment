import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

const API_URL = 'https://5b2734891ca6.ngrok-free.app';

 type RootStackParamList = {
   Home: undefined;
   CategoryScreen: { category: string };
 };

type CategoryListProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type Categories = {
  id: number;
  name: string;
  image: string;
}

const CategoryList = ({ navigation }: CategoryListProps) => {
  const [categories, setCategories] = useState<Categories[]>([]); 

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(cat => {
        console.log('Categories:', cat);
        setCategories(cat);
      })
  }, []);
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => navigation.navigate('CategoryScreen', {category: cat.name })}
          >
            <Image source={{ uri: cat.image }} style={styles.image} />
            <Text numberOfLines={1}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFF2E0',
    borderRadius: 12,
    padding:10,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD59A',
  },
  text: {
    color: '#f39c12',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
});

export default CategoryList;