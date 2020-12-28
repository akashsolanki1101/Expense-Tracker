import React from 'react'

import {View,Text,StyleSheet,StatusBar} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'

const useStyles=()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.background,
                paddingHorizontal:20,
                paddingVertical:20
            },
            upperBlock:{
                borderWidth:1,
                borderColor:'orange'
            },
            helloText:{
                color:theme.theme.secondary,
                fontSize:25,
                fontWeight:'normal'
            },
            nameText:{
                color:theme.theme.primary,
                fontSize:40,
                fontWeight:'bold'
            },
            middleBlock:{
                borderWidth:1,
                borderColor:'red',
                width:'100%',
            },
            lowerBlock:{
                borderWidth:1,
                borderColor:'white'
            }
        })
    )
}

export const Home = ()=>{
    const styles = useStyles()
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme.mode==='dark'?'light-content':'dark-content'} backgroundColor={theme.theme.background}/>
            <View style={styles.upperBlock}>
                <View style={styles.textContainer}>
                    <Text style={styles.helloText}>Hello,</Text>
                    <Text style={styles.nameText}>Akash</Text>
                </View>
            </View>
            <View style={styles.middleBlock}>
                <View style={styles.textContainer}>
                    <Chart/>
                </View>
            </View>
            <View style={styles.lowerBlock}>
                <View style={styles.transactionsContainer}>

                </View>
            </View>
        </View>
    )
}