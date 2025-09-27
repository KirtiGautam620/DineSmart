import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignUpScreens/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignUpScreens/LoginScreen';
import RootNavigation from './src/RootNavigation';
export default function App() {
  return (
    // <View style={styles.container}>
      <RootNavigation/> 
    // {/* // </View> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
