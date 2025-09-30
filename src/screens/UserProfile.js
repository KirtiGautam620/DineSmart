import { View, Text ,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {colors} from '../global/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
const UserProfile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.backbtn} onPress={()=>navigation.goBack()} >
        <Ionicons name='arrow-back' size={28} color={colors.col2} />
    </TouchableOpacity>
    <View style={styles.head}>
        <Avatar.Image size={200} />
      <Text style={styles.name}>UserProfile</Text>
      <Text style={styles.email}>description</Text>
    </View>
    </SafeAreaView>
  )
}

export default UserProfile  
const styles=StyleSheet.create({
    container:{
        backgroundColor:colors.col3,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    head:{
        alignItems:'center',
        marginBottom:300
    },
    name:{
        fontSize:25,
        fontWeight:'bold',
        color:colors.text1,
        marginTop:15,
    },
    email:{
        fontSize:20 ,
        color:colors.col2,
        marginTop:5
    },
    backbtn:{
        position:"absolute",
        top:60,
        left:20,
        zIndex:10,
        padding:8,
    }
})