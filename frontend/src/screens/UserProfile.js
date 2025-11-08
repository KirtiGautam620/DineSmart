import { View, Text ,StyleSheet, TouchableOpacity,Button} from 'react-native'
import React,{useEffect,useState} from 'react'
import {colors,btn1} from '../global/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {wd,hd} from "../utils/responsive"
const UserProfile = ({navigation}) => {
    const [user,setUser]=useState(null)

    useEffect(()=>{
        const Dummy=async ()=>{
            const DummyUser={
                name:"Kirti Gautam",
                email:"kirti@abcddd.com",
                phone:"+917657543432",
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
            <TouchableOpacity onPress={handle} style={styles.lbtn}>
                <Text style={styles.btntxt}>Log Out</Text>
            </TouchableOpacity>
            </>
        ):(
            <>
            <Avatar.Image size={200} style={{backgroundColor:"#ffa07a"}}/>
            <Text style={styles.name}>No Profile Found.</Text>
            <Text> Please Log In</Text>
            <TouchableOpacity title="Logout" style={styles.lbtn}>
                <Text style={styles.btntxt} onPress={()=>navigation.navigate('login')}>Log In</Text>
            </TouchableOpacity>
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
        marginBottom:wd(3)
    },
    name:{
        // backgroundColor:'red',
        fontSize:wd(8),
        fontWeight:'bold',
        color:colors.text3,
        marginTop:35,
    },
    email:{
        fontSize:20 ,
        color:colors.col2,
        marginTop:10
    },
    phone:{
        fontSize:20 ,
        color:colors.col2,
        marginTop:5
    },
    backbtn:{
        position:"absolute",
        top:hd(2),
        left:hd(1),
        zIndex:10,
        padding:8,
    },
    lbtn:{
        marginTop:30,
        backgroundColor:"#ffa07a",
        padding:15,
        borderRadius:10,
    },
    btntxt:{
        fontWeight:"bold"
    }

})