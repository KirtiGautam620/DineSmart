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
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
};

const SignupScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false)
  const [passwordfocus, setPasswordfocus] = useState(false)
  const [showpassword, setShowpassword] = useState(false)
  const [cpasswordfocus, setcPasswordfocus] = useState(false)
  const [showcpassword, setShowcpassword] = useState(false)
  const [namefocus, setNamefocus] = useState(false)
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handlegit = () => {
    Linking.openURL("https://catherina-pulmonary-cadence.ngrok-free.dev/auth/google/callback")
  }

  useEffect(() => {
    const handleLink = async () => {
      const t = '123456'
      await AsyncStorage.setItem('@user_token', t);
      navigation.navigate("home")
    }
    const subs = Linking.addEventListener("url", handleLink)
    return () => {
      subs.remove()
    }
  }, [])

  const handleSignup = async () => {
    if (!fullName||!email||!password||!confirmPassword||!address) {
      Alert.alert('Error', 'Please fill all the fields.')
      return
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return
    }
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long and contain at least one letter and one number.')
      return
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const usersStr = await AsyncStorage.getItem('@users_list')
      let users = usersStr ? JSON.parse(usersStr) : []
      const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        setLoading(false)
        Alert.alert('Error', 'Email is already in use.')
        return
      }

      const newUser = {
        name: fullName,
        email: email,
        password: password,
        address: address,
        phone: null,
        avatar: null
      }
      users.push(newUser)
      await AsyncStorage.setItem('@users_list', JSON.stringify(users))
      await AsyncStorage.setItem('@user_token', 'dummy-auth-token')
      await AsyncStorage.setItem('@user_profile', JSON.stringify({
        name: fullName,
        email: email,
        address: address,
        phone: null,
        avatar: null
      }))

      setLoading(false)
      Alert.alert('Success', 'Signed up successfully.')
      navigation.replace('home')
    } catch (error) {
      setLoading(false)
      Alert.alert('Error', 'Failed to sign up. Please try again.')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsHorizontalScrollIndicator={false}>
        <Text style={styles.head1}>Sign Up </Text>

        <View style={styles.inputout}>
          <FontAwesome6 name="user-large" size={24}
            color={namefocus ? colors.col3 : colors.col2} />
          <TextInput
            style={styles.input}
            placeholder='Full Name'
            value={fullName}
            onChangeText={setFullName}
            onFocus={() => {
              setEmailfocus(false)
              setPasswordfocus(false)
              setNamefocus(true)
              setcPasswordfocus(false)
            }}
          />
        </View>

        <View style={styles.inputout}>
          <Entypo name="email" size={24} color={emailfocus ? colors.col3 : colors.col2} />
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => {
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
            color={passwordfocus ? colors.col3 : colors.col2} />
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showpassword}
            onFocus={() => {
              setPasswordfocus(true)
              setEmailfocus(false)
              setShowpassword(false)
              setNamefocus(false)
              setcPasswordfocus(false)
            }}
          />
          <MaterialCommunityIcons
            name={showpassword ? "eye" : "eye-off"}
            size={24}
            color="black"
            onPress={() => setShowpassword(!showpassword)}
          />
        </View>

        <View style={styles.inputout}>
          <Foundation name="lock" size={24}
            color={cpasswordfocus ? colors.col3 : colors.col2} />
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showcpassword}
            onFocus={() => {
              setcPasswordfocus(true)
              setEmailfocus(false)
              setPasswordfocus(false)
              setNamefocus(false)
            }}
          />
          <MaterialCommunityIcons
            name={showcpassword ? "eye" : "eye-off"}
            size={24}
            color="black"
            onPress={() => setShowcpassword(!showcpassword)}
          />
        </View>

        <Text style={styles.address}>Please enter your address</Text>
        <View style={styles.inputout}>
          <TextInput
            style={styles.input1}
            placeholder='Enter Your Address'
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <TouchableOpacity
          style={btn1}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

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
              <Entypo name="instagram" size={26} color="#E1306C" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...hr80, marginTop: hd(1) }}></View>
        <Text>Already have an account?
          <Text style={styles.signup} onPress={() => navigation.navigate('login')}>  Sign In</Text>
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