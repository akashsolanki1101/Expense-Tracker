import React from 'react'

import {View,StyleSheet} from 'react-native'

import {Home} from '../home/homePage'

const useStyles = ()=>{
    return(
        StyleSheet.create({
            container:{
                flex:1,
            }
        })
    )
}

export const Layout = ()=>{
    const styles = useStyles()
    
    return(
        <View style={styles.container}>
            <Home/>        
        </View>
    )
}

