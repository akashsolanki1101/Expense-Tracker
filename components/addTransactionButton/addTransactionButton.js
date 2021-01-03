import React from 'react'

import {View,StyleSheet,TouchableNativeFeedback} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:50,
                height:50,
                borderRadius:25,
                backgroundColor:theme.theme.secondaryBackground,
                justifyContent:'center',
                alignItems:'center',
            },
            shield:{
                borderRadius:25,
                overflow:'hidden',
                position:'absolute',
                bottom:20,
                right:20,
                elevation:10,
            }
        })
    )
}

export const AddTransactionButton = ({click})=>{
    const styles = useStyles()
    const theme = useTheme()

    return(
        <View style={styles.shield} >
            <TouchableNativeFeedback
                onPress={click}
            >
                <View style={styles.container}>
                    <MaterialCommunityIcons name='pencil-outline' color={theme.theme.activeColor} size={26}/>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}