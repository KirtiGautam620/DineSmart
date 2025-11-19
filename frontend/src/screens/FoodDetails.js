import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hd, wd } from '../utils/responsive'; 
import { colors } from '../global/style';
const FoodDetails = ({ route }) => {
  const { food } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: food.imageUrl }}
          style={styles.image}
        />
        <View style={styles.infoCard}>
          <Text style={styles.name}>{food.name}</Text>
          <Text style={styles.price}>${food.price}</Text>
          <Text style={styles.description}>{food.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollView: {
    flex: 1,
    backgroundColor:colors.col3,
  },
  scrollContent:{
    padding: hd(2),
    alignItems:'center',
    flexGrow:1, 
  },
  image: {
    width:'100%',
    height:hd(30),
    borderRadius:15,
    marginBottom:hd(3),
  },
  infoCard:{
    width:'100%',
    backgroundColor:colors.col1,
    borderRadius:15,
    padding:hd(2),
    shadowColor:'#000',
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    shadowRadius:5,
    elevation:5,
  },
  name:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:hd(1),
    color:'#333',
  },
  price:{
    fontSize:20,
    color:'green',
    marginBottom:hd(1),
    fontWeight:'600',
  },
  description:{
    fontSize:16,
    color:'#555',
    textAlign:'center',
    lineHeight:22,
  },
});

export default FoodDetails;
