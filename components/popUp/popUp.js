import React from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:170,
                backgroundColor:theme.theme.secondaryBackground,
                elevation:10,
                borderWidth:1,
                borderColor:theme.theme.secondaryText,
                borderRadius:20,
                position:'absolute',
                right:5,
                top:21,
                overflow:'hidden'
            },
            popUpTextContainer:{
                width:'100%',
                justifyContent:'center',
                paddingHorizontal:15,
                paddingVertical:12,
            },
            popUpText:{
                color:theme.theme.primaryText,
                fontSize:20,

            }
        })
    )
}

export const PopUp = ({navigation,hideMenu,showCategory})=>{
    const styles = useStyles()

    const handleCategoriesButtonClick = ()=>{
        navigation.navigate('Categories')
        hideMenu()
    } 

    const handleAnalysisButtonClick = ()=>{
        navigation.navigate('Dashboard')
        hideMenu()
    } 

    const handleSettingsClick = ()=>{
        navigation.navigate('Settings')
        hideMenu()
    } 

    return(
        <View style={styles.container}>
            {
                showCategory&&
                <TouchableNativeFeedback
                    onPress={handleCategoriesButtonClick}
                >
                    <View style={styles.popUpTextContainer}>  
                        <Text style={styles.popUpText}>Categories</Text>
                    </View>
                </TouchableNativeFeedback>
            }
            <TouchableNativeFeedback
                onPress={handleAnalysisButtonClick}
            >
                <View style={styles.popUpTextContainer}>
                    <Text style={styles.popUpText}>Dashboard</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
                onPress={handleSettingsClick}
            >
                <View style={styles.popUpTextContainer}>
                    <Text style={styles.popUpText}>Settings</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}