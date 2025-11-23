import React,{useState,useEffect } from 'react'
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Alert} from 'react-native'
import {titles,colors,background,btn1,hr80 } from '../../global/style'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import {Linking} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

const LoginScreen = ({navigation}) => {
  const [emailfocus,setEmailfocus] = useState(false)
  const [passwordfocus, setPasswordfocus] = useState(false)
  const [showpassword, setShowpassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlegit = () => {
    Linking.openURL("http://localhost:3000/auth/github")
  }

  useEffect(() => {
    const handleLink = async () => {
      const t = '123456'
      await AsyncStorage.setItem('@user_token', t)
      Alert.alert("Success", "You have successfully logged in")
      navigation.navigate("home")
    }
    const subd = Linking.addEventListener("url", handleLink)
    return () => {
      subd.remove()
    }
  }, [])

const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.')
      return
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const usersStr = await AsyncStorage.getItem('@users_list')
      const users = usersStr ? JSON.parse(usersStr) : []

      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
      if (user) {
        await AsyncStorage.setItem('@user_token', 'dummy-auth-token')
        await AsyncStorage.setItem('@user_profile', JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone || null,
          avatar: user.avatar || null
        }))

        setLoading(false)
        Alert.alert('Success', 'Logged in successfully.')
        navigation.replace('home')
      } else {
        setLoading(false)
        Alert.alert('Error', 'Invalid email or password.')
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('Error', 'Login failed. Please try again.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Sign In </Text>

      <View style={styles.inputout}>
        <FontAwesome6 name="user-large" size={24}
          color={emailfocus ? colors.col3 : colors.col2} />
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
          }}
        />
        <MaterialCommunityIcons
          name={showpassword ? "eye" : "eye-off"}
          size={24}
          color="black"
          onPress={() => setShowpassword(!showpassword)}
        />
      </View>

      <TouchableOpacity
        style={btn1}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
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
            <Entypo name="instagram" size={26} color="#E1306C" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <Text>Don't have an account?
        <Text style={styles.signup} onPress={() => navigation.navigate('signup')}>  Sign Up</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.bg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  head1: {
    fontSize: titles.title1,
    color: colors.col2,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 20,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  forgot: {
    color: colors.text1,
    marginTop: 20,
    marginBottom: 10
  },
  or: {
    color: colors.col2,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  txt: {
    color: colors.text1,
    marginVertical: 10,
    fontSize: 22,
  },
  gi: {
    flexDirection: 'row',
  },
  gicon: {
    backgroundColor: '#FFFFFF',
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 0.5,
  },
  signup: {
    color: colors.text1,
  }
})
export default LoginScreen