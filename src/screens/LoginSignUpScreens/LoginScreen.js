import React,{useState} from 'react'
import {StyleSheet, View,Text,TextInput, TouchableOpacity} from 'react-native'
import { titles ,colors,background,btn1 } from '../../global/style'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
const LoginScreen = () => {
    const [emailfocus,setEmailfocus]=useState(false)
    const [passwordfocus,setPasswordfocus]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
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
      <TouchableOpacity style={btn1}>
        <Text style={{color:colors.col1,fontSize:titles.btntxt,fontWeight:'bold'}}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password?    </Text>
      <Text style={styles.or} >OR</Text>
      <Text style={styles.txt}>Sign In With</Text>

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
    }
})
export default LoginScreen