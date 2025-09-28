import React from 'react'
import {View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import logo from '../../../assets/logo.png'
import {colors,hr80,background} from '../../global/style'
const WelcomeScreen = ({navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome To DineSmart</Text>
        <View >
            <Image source={logo}/>
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
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:background.bg,
        width:"100%"
    },
    title:{
        fontSize:50,
        color:colors.col2,
        textAlign:'center',
        fontWeight:'bold',
        marginVertical:10, 
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