import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../global/style';
import { wd, hd } from '../utils/responsive';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('@favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    loadFavorites();

    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (itemId) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favoriteItem}
      onPress={() => navigation.navigate('FoodDetails', { food: item })}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.favoriteImage}
      />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoritePrice}>${item.price}</Text>
        <Text style={styles.favoriteCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={(e) => {
          e.stopPropagation();
          removeFavorite(item.id);
        }}
      >
        <FontAwesome name="heart" size={24} color="#ff0000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.col2} />
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="heart-o" size={80} color={colors.text1} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Start adding meals to your favorites!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col3,
  },
  header: {
    padding: hd(2),
    backgroundColor: colors.col1,
    borderBottomWidth: 1,
    borderBottomColor: colors.col3,
  },
  headerTitle: {
    fontSize: wd(6),
    fontWeight: 'bold',
    color: colors.col2,
    marginBottom: hd(0.5),
  },
  headerSubtitle: {
    fontSize: wd(4),
    color: colors.text1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hd(2),
    fontSize: wd(4),
    color: colors.text1,
  },
  listContent: {
    padding: hd(2),
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    borderRadius: 15,
    marginBottom: hd(2),
    padding: hd(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteImage: {
    width: wd(25),
    height: hd(12),
    borderRadius: 10,
    marginRight: wd(3),
  },
  favoriteInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteName: {
    fontSize: wd(4.5),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hd(0.5),
  },
  favoritePrice: {
    fontSize: wd(4),
    color: 'green',
    fontWeight: '600',
    marginBottom: hd(0.5),
  },
  favoriteCategory: {
    fontSize: wd(3.5),
    color: colors.text1,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hd(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hd(5),
  },
  emptyIcon: {
    marginBottom: hd(3),
    opacity: 0.5,
  },
  emptyText: {
    fontSize: wd(5),
    fontWeight: 'bold',
    color: colors.text1,
    marginBottom: hd(1),
  },
  emptySubtext: {
    fontSize: wd(4),
    color: colors.text1,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default FavoritesScreen;
