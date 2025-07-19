import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ViewToken } from 'react-native';

const API_URL = 'https://lelekartbackend.vercel.app/';

type banners = {
  id: number;
  title: string,
  subtitle:string,
  image_url:string

};

const { width } = Dimensions.get('window');

const BannerList = () => {
  const [banners, setBanners] = useState<banners[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems.length > 0) {
      const idx = info.viewableItems[0].index;
      setActiveIndex(typeof idx === 'number' ? idx : 0);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/banners`).then(res => res.json())
    ])
      .then(([ban]) => {
        console.log('banners:', ban);
        setBanners(ban);
      })
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= banners.length) nextIndex = 0;
      if (banners.length > 0) {
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, banners.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            <Image source={{ uri: item.image_url }} style={styles.bannerImage} />
            <Text style={styles.bannerText}>{item.title}</Text>
            <Text style={styles.bannerText}>{item.subtitle}</Text>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />
      <View style={styles.dotsContainer}>
        {banners.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginVertical: 10,
    height: 220,
    backgroundColor:'#4b7bec'
  },
  bannerCard: {
    width: width,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 12,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#74b9ff',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
  },
});

export default BannerList; 