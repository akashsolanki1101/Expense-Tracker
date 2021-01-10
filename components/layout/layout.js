import React,{useEffect,useCallback} from 'react'

import {View,StyleSheet,StatusBar} from 'react-native'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import {StackNavigator} from '../../navigation/navigation'
import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground
            }
        })
    )
}

export const Layout = ()=>{
    const styles = useStyles()
    const theme = useTheme()
    const lightKeys = theme.mode==='light'?true:false

    const changeColor = useCallback(async()=>{
        try{
            const res = await changeNavigationBarColor(theme.theme.secondaryBackground,lightKeys);
            console.log(res);
        }catch(e){
            console.log(e);
        }   
    },[theme])

    useEffect(()=>{
        changeColor()
    },[changeColor])
    

    return(
        <View style={styles.container}>
            <StatusBar barStyle={theme.mode==='dark'?'light-content':'dark-content'} backgroundColor={theme.theme.primaryBackground}/>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>       
        </View>
    )
}

