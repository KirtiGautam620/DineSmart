import { View, Text ,StatusBar,TextInput,ScrollView,StyleSheet, TouchableOpacity,Image,FlatList} from 'react-native'
import React,{useState,useEffect} from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import Feather from '@expo/vector-icons/Feather';
import {colors} from '../global/style'
import {foods,categories} from '../data/dummy'
import Entypo from '@expo/vector-icons/Entypo';

const HomeScreen = () => {
  const [foodData, setFoodData] =useState([])
  const [categoryData, setCategoryData] = useState("Today's Special");

  const [search,setSearch] = useState('')

  // console.log(search) 
  useEffect(() => {
    if(categoryData==="Today's Special"){
      setFoodData(foods)
    } else{
      setFoodData(foods.filter((item)=>item.category===categoryData))
    }
  },[categoryData])
  // console.log("category",categoryData)
  // console.log("food",foods.filter((item)=>item.category===categoryData))

  return (
    <View style={styles.container}>
        <StatusBar/>  
        <HomeHeadNav/>
        <View style={styles.searchbox}>
        <Feather name="search" size={24} color="black" style={styles.searchicon}/>
        <TextInput placeholder='Search' style={styles.input} 
        onChangeText={(text)=>{setSearch(text)} } 
        />
        </View> 
        {search!= '' && 
        <View style={styles.searchres}>
          {/* <Text>You typed something</Text> */}
           <FlatList
           style={styles.searchresin}
           data={foodData}
           renderItem={({item})=>{
            if(item.name.toLowerCase().includes(search.toLowerCase())){
               return (
                <View style={styles.searchresbox}>
                  <Entypo name="minus" size={24} color={colors.text1} />
                  <Text style={styles.searchtext }>{item.name}</Text>
                </View> 
               )
            }
           }}
           />
        </View>}
        <Categories/>
        <OfferSlider/> 
        <ScrollView style={{flex:1,width:'100%'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10,marginRight:20 }}>
  {categories.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => setCategoryData(item)}
      style={{ marginHorizontal: 10 }}
    >
      <View style={[styles.categoryButton, categoryData === item && styles.selectedCategory]}>
        <Text style={{ color: categoryData === item ? 'white' : 'black' }}>{item}</Text>
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>


<ScrollView style={{ width: '90%' }}>
  {foodData.map(food => (
    <View key={food.id} style={styles.foodItem}>
     <Image source={{ uri: food.imageUrl }} style={{ width: '100%', height: 150, borderRadius: 10, marginTop: 5 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 20}}>{food.name}</Text>
      <Text>${food.price}</Text>
      <Text>{food.type} | {food.mealType}</Text>
    </View>
  ))}
</ScrollView>
</ScrollView>
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
  },
  foodItem:{
    padding:15,
    marginVertical:5,
    backgroundColor:'#ffa07a',
    borderRadius:10,
    marginLeft:30,
  },
  categoryButton: {
    marginLeft:10,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.col1,
  },
  selectedCategory: {
    marginLeft:10,
    backgroundColor: '#a0522d',
  },
  searchres:{
    width:'100%',
    marginHorizontal:30,
    backgroundColor:colors.col1,
  },
  searchresin:{
    width:"100%"
  },
  searchresbox:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    padding:5
  },
  searchtext:{
    marginLeft:10,
    fontSize:18,
    color:colors.text1
  }

}) 
export default HomeScreen