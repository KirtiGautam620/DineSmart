import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import HomeScreen from '../HomeScreen'
import UserProfile from '../UserProfile'
const Stack=createNativeStackNavigator()
 
const AuthNavigation = () => {
  return (
        <Stack.Navigator initialRouteName='welcomepage'>
            <Stack.Screen name='welcomepage' component={WelcomeScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='signup' component={SignupScreen}  options={{headerShown:false}}/>
            <Stack.Screen name='home' component={HomeScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="userprofile" component={UserProfile} options={{headerShown:false}} />
        </Stack.Navigator>
  )
}

export default AuthNavigation