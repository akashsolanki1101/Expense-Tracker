import React from 'react'

import {View,Text,StyleSheet,ActivityIndicator} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:'100%',
                position:'absolute',
                backgroundColor:'rgba(0,0,0,.5)',
                justifyContent:'center',
                alignItems:'center',
                top:0,
                left:0
            },
            loaderContainer:{
                width:300,
                height:90,
                paddingVertical:15,
                paddingHorizontal:20, 
                backgroundColor:theme.theme.secondaryBackground,
                flexDirection:'row',
                borderWidth:2,
                borderColor:theme.theme.primaryText,
                borderRadius:5,
                alignItems:'center'
            },
            loaderText:{
                color:theme.theme.primaryText,
                fontSize:20,
                marginLeft:20,
            }
        })
    )    
}

export const Loader = ()=>{
    const styles = useStyles()
    const theme = useTheme()
    return(
        <View style={styles.container}> 
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={35} color={theme.theme.activeColor}/>
                <Text style={styles.loaderText}>Loading data...</Text>
            </View>        
        </View>
    )
}
