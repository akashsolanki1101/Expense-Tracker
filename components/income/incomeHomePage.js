import React from 'react'

import {View,Text,StyleSheet} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryCard} from '../cards/categoryCard/categoryCard'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                paddingHorizontal:20,
                paddingVertical:20,
                borderWidth:1,
                borderColor:'white'
            },
        })
    )
}

export const IncomeHomePage = ()=>{
    const styles = useStyles()
    return(
        <View style={styles.container}>
            <CategoryCard
                categoryName='Fast Food'
                percent={46}
                imgUrl='../../../assets/img/categoryCard/fast-food.png'
            />
            <CategoryCard
                categoryName='Grocery'
                percent={90}
                imgUrl='../../../assets/img/categoryCard/shopping.png'            />
        </View>
    )
}