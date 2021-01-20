import React,{useEffect} from 'react'

import {View,ActivityIndicator,StyleSheet,Image} from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage'

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

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

export const SplashScreen = ()=>{
    const styles = useStyles()
    const theme = useTheme()
    const lightKeys = theme.mode==='light'?true:false


    useEffect(()=>{
        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS user(id string primary key, name string, theme string)');
        })
        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS transactions(id string primary key, category string, amount int, date string, particular string,key int)')
        })
    },[db])

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