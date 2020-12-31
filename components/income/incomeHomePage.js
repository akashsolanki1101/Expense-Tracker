import React from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'
import {PopUp} from '../popUp/popUp'
import Entypo from 'react-native-vector-icons/Entypo'
// import {CategoryCard} from '../cards/categoryCard/categoryCard'


const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                paddingHorizontal:18,
                paddingVertical:20,
                // borderWidth:1,
                // borderColor:'white'
            },
            upperBlock:{
                width:'100%',
                // borderWidth:1,
                // borderColor:'orange',
                flexDirection:'row',
                justifyContent:'space-between',
            },
            helloText:{
                color:theme.theme.secondaryText,
                fontSize:25,
                fontWeight:'normal'
            },
            nameText:{
                color:theme.theme.primaryText,
                fontSize:40,
                fontWeight:'bold',
            },
            searchIconContainer:{
                // borderWidth:2,
                // borderColor:'red',
                marginRight:10,
                justifyContent:'space-between',
                paddingVertical:4
            },
        })
    )
}

export const IncomeHomePage = ()=>{
    const styles = useStyles()
    const theme = useTheme()

    const handleMenuButtonClick = (data)=>{
        console.log(data.style);
    }    

    return(
        <View style={styles.container}>
            <View style={styles.upperBlock}>
                <View style={styles.textContainer}>
                    <Text style={styles.helloText}>Hello,</Text>
                    <Text style={styles.nameText}>Akash</Text>
                </View>
                <View style={styles.searchIconContainer}>
                    <TouchableNativeFeedback
                        onPress={handleMenuButtonClick}
                    >
                        <Entypo name='dots-three-vertical' color={theme.theme.primaryText} size={23}/>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <AddTransactionButton/>
        </View>
    )
}