import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import SplashScreen from './SplashScreen'
import HomeScreen from '../HomeScreen'
import UserProfile from '../UserProfile'
import TabNavigation from './TabNavigation'
import FavoritesScreen from '../Favorites'
import FoodDetails from '../FoodDetails'
const Stack=createNativeStackNavigator()
const AuthNavigation = () => {
  return (
        <Stack.Navigator initialRouteName='splash'>
            <Stack.Screen name='splash' component={SplashScreen} options={{headerShown:false}} />
            <Stack.Screen name='welcomepage' component={WelcomeScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='signup' component={SignupScreen}  options={{headerShown:false}}/>
            <Stack.Screen name='home' component={TabNavigation}  options={{headerShown:false}}/>
            <Stack.Screen name="userprofile" component={UserProfile} options={{headerShown:false}} />
            <Stack.Screen name='favorites' component={FavoritesScreen} options={{headerShown:false}} />
            <Stack.Screen name='FoodDetails' component={FoodDetails} options={{headerShown:false}}/>
        </Stack.Navigator>
  )
}

export default AuthNavigation
