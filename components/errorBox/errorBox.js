import React from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:'100%',
                backgroundColor:'rgba(0,0,0,.5)',
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
                top:0,
                left:0,
                zIndex:2
            },
            errorBox:{
                width:300,
                height:155,
                backgroundColor:theme.theme.secondaryBackground,
                paddingHorizontal:15,
                paddingVertical:12,
                justifyContent:'space-between'
            },
            titleContainer:{
                width:'100%',
                backgroundColor:theme.theme.secondaryBackground,
            },
            title:{
                color:theme.theme.primaryText,
                fontSize:20,
            },
            errorMessage:{

            },
            errorMessageText:{
                color:theme.theme.primaryText,
                fontSize:16
            },
            responseButtonContainer:{
                width:'100%',
                alignItems:'flex-end'
            },
            responseButton:{
                width:40,
                paddingVertical:2,
                alignItems:'center',
                justifyContent:'center',
            },
            responseButtonText:{
                fontSize:18,
                color:theme.theme.activeColor
            }
        })
    )
}

export const ErrorBox = ({closeDialogBox,message})=>{
    const styles = useStyles()

    return(
        <TouchableWithoutFeedback
            onPress={closeDialogBox}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                >
                    <View style={styles.errorBox}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Warning!!!</Text>
                        </View>
                        <View style={styles.errorMessage}>
                            <Text style={styles.errorMessageText}>{message}</Text>
                        </View>
                        <View style={styles.responseButtonContainer}>
                            <TouchableNativeFeedback
                                onPress={closeDialogBox}
                            >
                                <View style={styles.responseButton}>
                                    <Text style={styles.responseButtonText}>OK</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )
}