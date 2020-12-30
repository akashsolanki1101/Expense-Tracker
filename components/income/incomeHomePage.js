import React from 'react'

import {View,Text,StyleSheet} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'

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
        })
    )
}

export const IncomeHomePage = ()=>{
    const styles = useStyles()
    return(
        <View style={styles.container}>
            <AddTransactionButton/>
        </View>
    )
}