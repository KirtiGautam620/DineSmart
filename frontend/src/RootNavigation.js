import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './screens/LoginSignUpScreens/AuthNavigation'
import UserProfile from './screens/UserProfile'
const RootNavigation = () => {
  return (
   <NavigationContainer>
    <AuthNavigation/>   
   </NavigationContainer>
  )
}

export default RootNavigation