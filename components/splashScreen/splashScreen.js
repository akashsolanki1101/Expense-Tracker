import React from 'react'

import {View,ActivityIndicator,StyleSheet,Image} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()

    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:'black',
                justifyContent:'space-between',
                alignItems:'center'
            },
            appIconContainer:{
                height:'55.5%',
                justifyContent:'flex-end'
            },
            appIcon:{
                width:70,
                height:70
            },
            loaderContainer:{
                height:'40%',
                width:'100%',
                alignItems:'center'
            }
        })
    )
}

export const SplashScreen = ()=>{
    const styles = useStyles()

    return(
        <View style={styles.container}>
            <View style={styles.appIconContainer}>
                <Image source={require('../../assets/img/app_icon.png')} style={styles.appIcon}/>
            </View>
            <View style={styles.loaderContainer}>
                <ActivityIndicator color="white" size={25}/>
            </View>
        </View>
    )
}