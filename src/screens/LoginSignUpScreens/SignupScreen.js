import React,{useState} from 'react'
import {StyleSheet, View,Text,TextInput, TouchableOpacity} from 'react-native'
import { titles ,colors,background,btn1, hr80 } from '../../global/style'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const  SignupScreen= ({navigation}) => {
    const [emailfocus,setEmailfocus]=useState(false)
    const [passwordfocus,setPasswordfocus]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
    const [cpasswordfocus,setcPasswordfocus]=useState(false)
    const [showcpassword,setShowcpassword]=useState(false)
    const [namefocus,setNamefocus]=useState(false)
  return (
    <View style={styles.container}> 
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
        <TouchableOpacity>
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
      <Text>Already have an account?
        <Text style={styles.signup} onPress={()=>navigation.navigate('login')}>  Sign In</Text>
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
    },
    address:{
      fontSize:17,
      color:colors.text1,
      textAlign:'center',
      fontWeight:'bold'
    },
    

})
export default SignupScreen