import React,{useState,useEffect} from 'react'
import {StyleSheet, View,Text,TextInput, TouchableOpacity} from 'react-native'
import { titles ,colors,background,btn1, hr80 } from '../../global/style'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import {Linking,Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
    const [emailfocus,setEmailfocus]=useState(false)
    const [passwordfocus,setPasswordfocus]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
    const [err,setErr]=useState(false)
    const handlegit=()=>{
      Linking.openURL("http://localhost:3000/auth/github")
    }
    useEffect(()=>{
      const handleLink=async ()=>{
        const t='123456'
        await AsyncStorage.setItem('@user_token',t)
        Alert.alert("Success","You have successfully logged in")
        navigation.navigate("home")
      }
      const subd =Linking.addEventListener("url",handleLink)
      return ()=>{
      subd.remove()
      }
    },[])
  return (
    <View style={styles.container}> 
      <Text style={styles.head1}>Sign In </Text>

      <View style={styles.inputout}>
        <FontAwesome6 name="user-large" size={24} 
        color={emailfocus?colors.col3:colors.col2}/> 
        <TextInput 
        style={styles.input} 
        placeholder='Email'
        onFocus={()=>{
            setEmailfocus(true)
            setPasswordfocus(false)
        }}
        /> 
      </View>

      <View style={styles.inputout}>
      <Foundation name="lock" size={24} 
      color={passwordfocus?colors.col3:colors.col2} />
        <TextInput 
        style={styles.input} 
        placeholder='Password'
        onFocus={()=>{
            setPasswordfocus(true)
            setEmailfocus(false)
            setShowpassword(false)
        }}
        secureTextEntry={showpassword===false?true:false}
        />
        <MaterialCommunityIcons 
        name={showpassword===false? "eye-off" :"eye"}
        size={24} 
        color="black" 
        onPress={()=>setShowpassword(!showpassword)}
        />
      </View>
      <TouchableOpacity style={btn1} onPress={()=>navigation.navigate('home')}>
        <Text style={{color:colors.col1,fontSize:titles.btntxt,fontWeight:'bold'}}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password?    </Text>
      <Text style={styles.or} >OR</Text>
      <Text style={styles.txt}>Sign In With</Text>

      <View style={styles.gi}>
        <TouchableOpacity onPress={handlegit}>
             <View style={styles.gicon}>
             <AntDesign name="google" size={26} color="#4285F4" />
             </View>
        </TouchableOpacity>
        <TouchableOpacity>
             <View style={styles.gicon}>
             <Entypo name="instagram" size={26} color="#E1306C"/>
             </View>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <Text>Don't have an account?
        <Text style={styles.signup} onPress={()=>navigation.navigate('signup')}>  Sign Up</Text>
      </Text>
    </View>
  )
}
  
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:background.bg,
        alignItems:'center',
        justifyContent:'center',
        width:'100%', 
    },
    head1:{
        fontSize:titles.title1,
        color:colors.col2, 
    },
    inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:20,
        backgroundColor:colors.col1,
        borderRadius:10, 
        paddingHorizontal:10,
        paddingVertical:10,
    },
    input:{
        fontSize:18,
        marginLeft:10,
        flex:1, 
    },
    forgot:{
        color:colors.text1,
        marginTop:20,
        marginBottom:10
    },
    or:{
        color:colors.col2,
        fontWeight:'bold',
        marginVertical:10,
    },
    txt:{
        color:colors.text1,
        marginVertical:10,
        fontSize:22,
    },
    gi:{
        flexDirection:'row',
    },
    gicon:{
        backgroundColor:'#FFFFFF',
        width:50,
        margin:10,
        borderRadius:10,
        padding:10,
        alignItems:'center',
        shadowOpacity:0.4,
        shadowRadius:0.5,
    },
    signup:{
        color:colors.text1, 
    }
})
export default LoginScreen