import { View, Text ,StyleSheet, TouchableOpacity,Button} from 'react-native'
import React,{useEffect,useState} from 'react'
import {colors} from '../global/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
const UserProfile = ({navigation}) => {
    const [user,setUser]=useState(null)

    useEffect(()=>{
        const Dummy=async ()=>{
            const DummyUser={
                name:"Kirti Gautam",
                email:"kirti@abc.com",
                phone:"+91765754343",
                avatar:require("../../assets/avt.jpeg")
            }
            await AsyncStorage.setItem('@user_profile',JSON.stringify(DummyUser))
        }
        Dummy()
    },[])
   
    useEffect(()=>{
        const fetchProfile= async ()=>{
            const val=await AsyncStorage.getItem('@user_profile')
            if(val){
                setUser(JSON.parse(val))
            }
        }
        fetchProfile()
    },[])
    const handle= async ()=>{
        await AsyncStorage.removeItem('@user_profile')
        setUser(null)
    }
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.backbtn} onPress={()=>navigation.goBack()} >
        <Ionicons name='arrow-back' size={28} color={colors.col2} />
    </TouchableOpacity>

    <View style={styles.head}>
        {
        user ? (
            <>
            <Avatar.Image size={200} source={user.avatar}/>
            <Text style={styles.name}>Name: {user.name}</Text>
            <Text style={styles.email}>Email: {user.email}</Text>
            <Text style={styles.phone}>Phone: {user.phone}</Text>
            <Button title="Logout" onPress={handle} />
            </>
        ):(
            <>
            <Avatar.Image size={200} />
            <Text>No Profile Found. Please Log In</Text>
            </>   
        )
        }
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
    phone:{
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