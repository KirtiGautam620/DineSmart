import React from 'react'
import {View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../../assets/logo.png'
import {colors,hr80,background} from '../../global/style'
import {wd,hd} from "../../utils/responsive"
const WelcomeScreen = ({navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Text style={styles.title}>Welcome To DineSmart</Text>
        <View >
            <Image source={logo} style={{width:wd(70),height:hd(40), resizeMode:'contain',marginVertical:hd(1),
            marginTop:hd(3)
            }}/>
        </View>

        <View style={hr80} />
        <Text style={styles.text}>Find the best Food around you at lowest price.</Text>
        <View  style={hr80} />
        <View style={styles.btnout}>
            <TouchableOpacity onPress={()=>navigation.navigate('signup')} >
                <Text style={styles.btn}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.btn} onPress={()=>navigation.navigate('login')}>Sign In</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:background.bg,
        paddingHorizontal:wd(4),
    },
    title:{
        fontSize:wd(15),
        color:colors.col2,
        textAlign:'center',
        fontWeight:'bold',
        zIndex:10 
    },
    // logo:{
    //     backgroundColor:'#fff',
    //     overflow:'hidden',
    //     borderWidth:1,
    //     borderColor:'#000',
    //     marginVertical:20,
    //     alignItems:'center',
    // },
    text:{
        fontSize:17,
        color:colors.col2,
        textAlign:'center',
    },
    btnout:{ 
        flexDirection:'row',
        marginBottom:10,
    },
    btn:{
        fontSize:20,
        color:colors.col2,
        textAlign:'center',
        marginVertical:30,
        marginHorizontal:10,
        fontWeight:'bold',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
        paddingHorizontal:20,
        marginTop:5,
    }
})

export default WelcomeScreen