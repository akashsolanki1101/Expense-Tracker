import React from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                // borderWidth:1,
                // borderColor:'white',
                paddingVertical:10
            },
            themeButtonContainer:{
                flexDirection:'row',
                paddingHorizontal:15,
                paddingVertical:10,
                borderBottomColor:theme.theme.secondaryText,
                borderBottomWidth:.5
            },
            themeButtonIconContainer:{
                justifyContent:'center',
                marginRight:35
            },
            themeButtonText:{
                color:theme.theme.primaryText,
                fontSize:20,
            },
            themeModeText:{
                color:theme.theme.secondaryText,
                marginTop:2
            },
            nameButtonContainer:{
                flexDirection:'row',
                paddingHorizontal:15,
                paddingVertical:10,
                borderBottomColor:theme.theme.secondaryText,
                borderBottomWidth:.5
            },
            nameButtonIconContainer:{
                justifyContent:'center',
                marginRight:35
            },
            nameButtonText:{
                color:theme.theme.primaryText,
                fontSize:20,   
            },
            nameText:{
                color:theme.theme.secondaryText,
                marginTop:2
            }
        })
    )
}

export const SettingsPage = ()=>{
    const theme = useTheme()
    const styles = useStyles()
    return(
        <View style={styles.container}>
            <TouchableNativeFeedback
                onPress={()=>{}}
                background={TouchableNativeFeedback.Ripple(theme.theme.secondaryText)}
            >
                <View style={styles.themeButtonContainer}>
                    <View style={styles.themeButtonIconContainer}>
                        {
                            theme.mode==='dark'?
                            <Ionicons name="moon" size={22} color={theme.theme.primaryText}/>
                            :<Feather name="sun" size={22} color={theme.theme.primaryText}/>
                        }
                    </View>
                    <View style={styles.themeButtonTextContainer}>
                        <Text style={styles.themeButtonText}>Theme</Text>
                        <Text style={styles.themeModeText}>Dark</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
                onPress={()=>{}}
                background={TouchableNativeFeedback.Ripple(theme.theme.secondaryText)}
            >
                <View style={styles.nameButtonContainer}>
                    <View style={styles.nameButtonIconContainer}>
                        <Ionicons name="person" size={22} color={theme.theme.primaryText}/>
                    </View>
                    <View style={styles.nameButtonTextContainer}>
                        <Text style={styles.nameButtonText}>Name</Text>
                        <Text style={styles.nameText}>Akash</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}