import React,{useState,useEffect} from 'react'
import {StyleSheet, View,Text,TextInput, TouchableOpacity,ScrollView} from 'react-native'
import { titles ,colors,background,btn1, hr80 } from '../../global/style'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Linking ,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hd,wd} from "../../utils/responsive"
const  SignupScreen= ({navigation}) => {
    const [emailfocus,setEmailfocus]=useState(false)
    const [passwordfocus,setPasswordfocus]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
    const [cpasswordfocus,setcPasswordfocus]=useState(false)
    const [showcpassword,setShowcpassword]=useState(false)
    const [namefocus,setNamefocus]=useState(false)

    
    const handlegit=()=>{
      Linking.openURL("http://localhost:3000/auth/github")
    }
    useEffect(()=>{
      const handleLink=async ()=>{
        // const url=event.url
        // const t=url.split("token=")[1]
        // if(t){
        const t='123456'
          await AsyncStorage.setItem('@user_token', t);
          navigation.navigate("home")
        // }
      }
      const subs= Linking.addEventListener("url",handleLink)
      return ()=>{
        subs.remove()
      }
    },[])
  return (
    
    <View style={styles.container}> 
    <ScrollView contentContainerStyle={styles.scroll} showsHorizontalScrollIndicator={false}>
      <Text style={styles.head1}>Sign Up </Text> 

      <View style={styles.inputout}>
        <FontAwesome6 name="user-large" size={24} 
        color={namefocus?colors.col3:colors.col2}/> 
        <TextInput 
        style={styles.input} 
        placeholder='Full Name'
        onFocus={()=>{
            setEmailfocus(false)
            setPasswordfocus(false)
            setNamefocus(true) 
            setcPasswordfocus(false)
        }}
        /> 
      </View>

      <View style={styles.inputout}>
        <Entypo name="email" size={24} color={emailfocus?colors.col3:colors.col2} />
        <TextInput 
        style={styles.input} 
        placeholder='Email'
        onFocus={()=>{
            setEmailfocus(true)
            setPasswordfocus(false)
            setNamefocus(false)
            setShowpassword(false)
            setcPasswordfocus(false)
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
            setNamefocus(false)
            setcPasswordfocus(false)
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

      <View style={styles.inputout}>
      <Foundation name="lock" size={24} 
      color={cpasswordfocus?colors.col3:colors.col2} />
        <TextInput 
        style={styles.input} 
        placeholder='Confirm Password'
        onFocus={()=>{
            setcPasswordfocus(true)
            setEmailfocus(false)
            setPasswordfocus  (false)
            setNamefocus(false)
        }}
        secureTextEntry={showcpassword===false?true:false}
        />
        <MaterialCommunityIcons 
        name={showcpassword===false? "eye-off" :"eye"}
        size={24} 
        color="black"  
        onPress={()=>setShowcpassword(!showcpassword)}
        />
      </View>

        <Text style={styles.address}>Please enter your address</Text>
        <View style={styles.inputout}>
          <TextInput style={styles.input1} placeholder='Enter Your Address' />
        </View>

      <TouchableOpacity style={btn1}>
        <Text style={{color:colors.col1,fontSize:titles.btntxt,fontWeight:'bold'}}>Sign Up </Text>
      </TouchableOpacity>

      {/* <Text style={styles.forgot}>Forgot Password?    </Text>      */}
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
      <View style={{hr80,marginTop:hd(1)}}></View>
      <Text>Already have an account?
        <Text style={styles.signup} onPress={()=>navigation.navigate('login')}>  Sign In</Text>
      </Text>
      </ScrollView>
    </View>
   
  )
}
 
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:background.bg,
        width:wd(100), 
    },
    scroll:{
      alignItems:'center',
      paddingVertical:hd(5),
      paddingHorizontal:wd(5),
    },
    head1:{
      marginTop:hd(5),
      margin:hd(1),
        fontSize:titles.title1,
        color:colors.col2, 
    },
    inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:hd(1),
        backgroundColor:colors.col1,
        borderRadius:10, 
        paddingHorizontal:hd(1),
        paddingVertical:hd(1),
    },
    input:{
        fontSize:18,
        marginLeft:hd(1),
        flex:1, 
    },
    forgot:{
        color:colors.text1,
        marginTop:hd(2),
        marginBottom:hd(1)
    },
    or:{
        color:colors.col2,
        fontWeight:'bold',
        marginVertical:hd(1),
    },
    txt:{
        color:colors.text1,
        marginVertical:hd(1),
        fontSize:22,
    },
    gi:{
        flexDirection:'row',
    },
    gicon:{
        backgroundColor:'#FFFFFF',
        width:hd(10),
        margin:hd(1),
        borderRadius:hd(1.5),
        padding:hd(2),
        alignItems:'center',
        shadowOpacity:0.4,
        shadowRadius:0.5,
    },
    signup:{
        color:colors.text1, 
        marginTop:hd(4)
    },
    address:{
      fontSize:17,
      color:colors.text1,
      textAlign:'center',
      fontWeight:'bold',
      marginBottom:hd(1),
    },
    

})
export default SignupScreen