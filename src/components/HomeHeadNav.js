import { View, Text ,StyleSheet,ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {colors} from '../global/style'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from 'react-native-paper';
const HomeHeadNav = ({navigation }) => {
  const [active, setActive] = React.useState('');
  return (
    <SafeAreaView>
    <View style={styles.safe}>
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.openDrawer()}>
      <FontAwesome name="navicon" size={24} color="black" style={styles.myicon} />
      </TouchableOpacity>
      <View style={styles.containerin}>
        <Text style={styles.mytext}>Dine-Smart</Text>
        <Ionicons name="fast-food" size={24} color="black" style={styles.myicon}  />
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('userprofile')}>
      <FontAwesome6 name="circle-user" size={24} color="black" style={styles.myicon} />
      </TouchableOpacity>
    </View>
    </View> 
    </SafeAreaView>
  )
}
 
const styles=StyleSheet.create({
  safe:{
    backgroundColor:colors.col2,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  container:{
    flexDirection:'row',
    width:"100%",
    justifyContent:'space-between',
    padding:18,
    backgroundColor:colors.col1,
    alignItems:'center',
    shadowOpacity:0.23,
    shadowRadius:2.62,
    shadowOffset:{width:0,height:5},
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  containerin:{
     flexDirection:'row',
     alignItems:'center',
  },
  myicon:{
    color:colors.col3,
  },
  mytext:{
    fontSize:20,
    color:colors.col3,
  } 

})
 
export default HomeHeadNav
