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
                alignItems:'center',
                paddingVertical:15
            },
            categoryName:{
                color:theme.theme.primaryText
            }
        })
    )
}

export const CategoryPage = ({route})=>{
    const styles = useStyles()
    const categoryName = route.params.categoryName

    return(
        <View style={styles.container}>
            <CategoryCard
                    categoryName={categoryName}
                    onClick={()=>{}}
            />
        </View>
    )
}