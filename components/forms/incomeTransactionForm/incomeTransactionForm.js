import React from 'react'

import {View,Text,StyleSheet} from 'react-native'

import {useTheme} from '../../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{

            }
        })
    )
}

const IncomeTransactionForm = ()=>{
    const styles = useStyles()

    return(
        <View></View>
    )

}