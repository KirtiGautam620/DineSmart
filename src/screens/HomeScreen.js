import { View, Text ,StatusBar,TextInput,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import Feather from '@expo/vector-icons/Feather';
import {colors} from '../global/style'
const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <StatusBar/>  
        <HomeHeadNav/>
        <View style={styles.searchbox}>
        <Feather name="search" size={24} color="black" style={styles.searchicon}/>
        <TextInput placeholder='Search' style={styles.input} />
        </View> 
        <Categories/>
        <OfferSlider/> 
    </View>
  )  
} 
  
const styles = StyleSheet.create({
  container:{
    flex:1, 
    alignItems:'center',
    width:'100%',
    backgroundColor:colors.col3,
  },
  searchbox:{
    flexDirection:'row',
    width:'90%',
    backgroundColor:colors.col1,
    borderRadius:30,
    alignItems:'center',
    padding:10,
    margin:20,
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    shadowRadius:4 ,
  },
  input:{
    width:'90%',
    fontSize:20,
    marginLeft:11,
  },
  searchicon:{
    color:colors.col2, 
  }
}) 
export default HomeScreen