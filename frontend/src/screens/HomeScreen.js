import { View, Text, StatusBar, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeadNav from '../components/HomeHeadNav';
import OfferSlider from '../components/OfferSlider';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../global/style';
import { MealApi } from '../../services/MealApi';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wd, hd } from "../utils/responsive";

const HomeScreen = ({ navigation }) => {
  const [foodData, setFoodData] = useState([]);
  const [categoryData, setCategoryData] = useState("Today's Special");
  const [categories, setCategories] = useState(["Today's Special"]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const isInitialLoad = useRef(true);
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('@favorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error loading favorites:', err);
      } finally {
        isInitialLoad.current = false;
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage whenever updated
  useEffect(() => {
    if (isInitialLoad.current) return;
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      } catch (err) {
        console.error('Error saving favorites:', err);
      }
    };
    saveFavorites();
  }, [favorites]);

  // Transform API meal to food object
  const transformMealToFood = (meal) => {
    const transformed = MealApi.TransformMealData(meal);
    if (!transformed) return null;
    const price = (Math.random() * 10 + 5).toFixed(2);
    return {
      id: transformed.id,
      name: transformed.title,
      price: parseFloat(price),
      type: "Veg",
      mealType: "Lunch",
      category: transformed.category || "Main Course",
      imageUrl: transformed.image,
      description: transformed.description,
      area: transformed.area,
      ingredients: transformed.ingredients,
      instructions: transformed.instructions,
      originalData: transformed.originalData
    };
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiCategories = await MealApi.getCategories();
        setCategories(["Today's Special", ...apiCategories.map(cat => cat.strCategory)]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch meals by category
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        let meals = [];
        if (categoryData === "Today's Special") {
          const randomMeals = await Promise.all(Array.from({ length: 10 }, () => MealApi.getRandomMeal()));
          meals = randomMeals.flat();
        } else {
          const categoryMeals = await MealApi.filterByCategory(categoryData);
          const mealDetails = await Promise.all(categoryMeals.slice(0, 20).map(m => MealApi.getById(m.idMeal)));
          meals = mealDetails.flat();
        }
        setFoodData(meals.map(transformMealToFood).filter(Boolean));
      } catch (err) {
        console.error('Error fetching meals:', err);
        setFoodData([]);
      } finally {
        setLoading(false);
      }
    };
    if (categories.length > 1) fetchMeals();
  }, [categoryData, categories]);

  // Search meals
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const results = await MealApi.searchByName(search);
        setSearchResults(results.map(transformMealToFood).filter(Boolean));
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const toggleFavorite = (item, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id);
      if (exists) return prev.filter(f => f.id !== item.id);
      return [...prev, item];
    });
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const filteredFood = search.trim() ? searchResults : foodData;

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setCategoryData(item)}>
      <View style={[styles.categoryButton, categoryData === item && styles.selectedCategory]}>
        <Text style={{ color: categoryData === item ? 'white' : 'black' }}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }) => {
    const favorite = isFavorite(item.id);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', { food: item })}>
        <View style={styles.foodItem}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: hd(25), borderRadius: 10, marginBottom: hd(1) }} />
            <TouchableOpacity style={styles.favoriteIcon} onPress={(e) => toggleFavorite(item, e)}>
              <FontAwesome name={favorite ? "heart" : "heart-o"} size={24} color={favorite ? "#ff0000" : "#ffffff"} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
          <Text>${item.price}</Text>
          <Text>{item.type} | {item.mealType}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SearchResultItem = ({ item }) => {
    const favorite = isFavorite(item.id);
    return (
      <TouchableOpacity onPress={() => { setSearch(''); navigation.navigate('FoodDetails', { food: item }); }}>
        <View style={styles.searchresbox}>
          <Text style={styles.searchtext}>{item.name}</Text>
          <TouchableOpacity style={styles.searchFavoriteIcon} onPress={(e) => toggleFavorite(item, e)}>
            <FontAwesome name={favorite ? "heart" : "heart-o"} size={20} color={favorite ? "#ff0000" : colors.text1} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.searchbox}>
        <Feather name="search" size={24} color="black" style={styles.searchicon} />
        <TextInput placeholder='Search' style={styles.input} value={search} onChangeText={setSearch} />
      </View>

      {search ? (
        <View style={styles.searchres}>
          {searchLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.col2} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredFood}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <SearchResultItem item={item} />}
              ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
            />
          )}
        </View>
      ) : (
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.col2} />
            <Text style={styles.loadingText}>Loading meals...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredFood}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: wd(2), paddingBottom: wd(5) }}
            ListHeaderComponent={
              <>
                <FlatList
                  data={categories}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderCategoryItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginVertical: 10, paddingLeft: wd(2) }}
                />
                <OfferSlider />
              </>
            }
            renderItem={renderFoodItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No meals available</Text>}
          />
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    width: '100%',
    backgroundColor: colors.col3, 
    alignItems: 'center'
   },
  searchbox:{
  flexDirection: 'row', 
  width: '90%', 
  backgroundColor: colors.col1,
  borderRadius: 30, 
  alignItems: 'center', 
  padding: hd(1), 
  margin: hd(2) 
  },
  input:{
    width: '90%', 
    fontSize: wd(5), 
    marginLeft: 11 
  },
  searchicon:{
    color: colors.col2 
  },
  foodItem: { 
    padding: hd(2), 
    marginVertical: hd(1), backgroundColor: '#ffa07a', borderRadius: 10, width: '100%' },
  imageContainer: { position: 'relative', width: '100%' },
  favoriteIcon: { position: 'absolute', top: hd(1), right: wd(2), backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: hd(0.8), zIndex: 1 },
  categoryButton: { padding: hd(1.7), marginHorizontal: wd(1), borderRadius: 20, backgroundColor: colors.col1 },
  selectedCategory: { backgroundColor: '#a0522d' },
  searchres: { width: '100%', marginHorizontal: 20, backgroundColor: colors.col1, maxHeight: hd(40) },
  searchresbox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 },
  searchtext: { fontSize: 18, color: colors.text1, flex: 1 },
  searchFavoriteIcon: { padding: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: hd(5) },
  loadingText: { marginTop: hd(2), fontSize: wd(4), color: colors.text1 },
  emptyText: { fontSize: wd(4.5), color: colors.text1, textAlign: 'center', marginTop: hd(2) },
});

export default HomeScreen;
