import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView } from 'react-native';
import TopBar from './android/components/TopBar';
import SearchBar from './android/components/SearchBar';
import CategoryList from './android/components/CategoryList';
import BannerList from './android/components/BannerList';
import DealOfTheDay from './android/components/DealOfTheDay';
import ProductList from './android/components/ProductList';
import CategoryScreen from './android/components/CategoryScreen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
  Home: undefined;
  CategoryScreen: { category: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => (
  <SafeAreaView>
    <ScrollView>
      <TopBar />
      <SearchBar />
      <CategoryList navigation={navigation} />
      <BannerList />
      <DealOfTheDay />
      <ProductList />
    </ScrollView>
  </SafeAreaView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen 
        name="CategoryScreen" 
        component={CategoryScreen} 
        options={({ route }) => ({ 
          title: route.params.category,
          headerStyle: { backgroundColor: '#f39c12' }, 
          headerTintColor: '#fff', })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;