import React from 'react'

import {View,Text,StyleSheet} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground
            },
            textAkash:{
                color:theme.theme.primaryText,
                fontSize:20
            }
        })
    )
}

export const CategoriesPage = ()=>{
    const styles = useStyles()
    return(
        <View style={styles.container}>
        </View>
    )
}