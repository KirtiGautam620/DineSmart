import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {colors} from '../global/style'
const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerslide}>
        <Swiper autoplay={true} autoplayTimeout={4} >
          <View style={styles.slide}>
             <Image source={require('../../assets/offer2.png')} style={styles.img}  /> 
          </View>
          <View style={styles.slide}>
             <Image source={require('../../assets/offer3.jpg')} style={styles.img}  /> 
          </View> 
          <View style={styles.slide}>
             <Image source={require('../../assets/offer5.jpeg')} style={styles.img}  /> 
          </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  offerslide:{
    width:'100%',
    height:200,
    backgroundColor:colors.col3,
    paddingHorizontal:10,
    justifyContent:'center',
    alignContent:'center',
    marginVertical:10,
  },
  slide:{
    width:'100%',
    height:200,
    backgroundColor:colors.col3,
    justifyContent:'center',
    alignContent:'center',
  },
  img:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderRadius:20,
  },
  
}) 