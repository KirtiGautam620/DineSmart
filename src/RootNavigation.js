import React from 'react'
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './screens/LoginSignUpScreens/AuthNavigation'
const RootNavigation = () => {
  return (
   <NavigationContainer>
    <AuthNavigation/>   
   </NavigationContainer>
  )
}

export default RootNavigation