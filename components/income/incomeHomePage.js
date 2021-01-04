import React from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
// import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'
// import {PopUp} from '../popUp/popUp'
// import Entypo from 'react-native-vector-icons/Entypo'
// import {CategoryCard} from '../cards/categoryCard/categoryCard'
import {CategoryListDropDown} from '../categoryListDropDown/categoryListDropDown'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                // paddingHorizontal:18,
                // paddingVertical:20,
                // borderWidth:1,
                // borderColor:'white'
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
            <CategoryListDropDown/>
        </View>
    )
}