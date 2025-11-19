import { View, Text,StyleSheet,ScrollView  } from 'react-native'
import React from 'react'
import {colors} from '../global/style';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Categories = () => {
return (
    <View style={styles.container }>
    <Text style={styles.head}>Categories</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false }>
        <View style={styles.box}>
        <FontAwesome5 name="hamburger" size={24} color="black" style={styles.myicon}/>
        <Text>Burger</Text>
        </View>
        <View style={styles.box}>
        <FontAwesome6 name="pizza-slice" size={24} color="black" style={styles.myicon}/>
        <Text>Pizza</Text>
        </View>
        <View style={styles.box}>
        <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.myicon}/>
        <Text>Noodles</Text>
        </View>
        <View style={styles.box}>
        <MaterialCommunityIcons name="food-apple" size={24} color="black" style={styles.myicon}/>
        <Text>Fruits</Text>
        </View>

        <View style={styles.box}>
        <MaterialIcons name="cake" size={24} color="black" style={styles.myicon} />
        <Text>Cake</Text>
        </View>
        <View style={styles.box}>
        <MaterialCommunityIcons name="tea" size={24} color="black" style={styles.myicon}/>
        <Text>Tea</Text>
        </View>
        <View style={styles.box}>
        <MaterialIcons name="icecream" size={24} color="black" style={styles.myicon}/>
        <Text>Ice Cream</Text>
        </View>
    </ScrollView>
    </View>
    )
} 
 
export default Categories
const styles=StyleSheet.create({
    container:{
        backgroundColor:colors.col1,
        width:'90%',
        borderRadius:10, 
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
    },
    head:{
        color:colors.col2,
        fontSize:23,
        fontWeight:'bold',
        alignSelf:'center',
        margin:10,
        paddingBottom:7,
        borderBottomColor:colors.col3,
        borderBottomWidth:1,
    },
    box:{
        backgroundColor:colors.col1,
        margin:5,
        padding:5,
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    myicon:{
        color:colors.col2,
        marginRight:10,
        color:colors.text3,
        
    }
}) 