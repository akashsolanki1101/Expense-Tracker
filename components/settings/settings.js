import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useTheme} from '../ui/themeContext/themeContext'
import {SelectThemeDropDown} from '../selectThemeDropDown/selectThemeDropDown'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                position:'relative'
            },
            themeButtonContainer:{
                flexDirection:'row',
                paddingHorizontal:15,
                paddingVertical:12,
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
                paddingVertical:12,
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
            },
            developerNameContainer:{
                flex:1,
                justifyContent:'flex-end',
                alignItems:'center',
                paddingBottom:5
            },
            fromText:{
                color:theme.theme.secondaryText,
            },
            developerName:{
                color:theme.theme.primaryText,
                fontWeight:'bold'
            }
        })
    )
}

export const SettingsPage = ()=>{
    const theme = useTheme()
    const styles = useStyles()

    const [showThemeSelector,setShowThemeSelector] = useState(false)
    const [themeMode,setThemeMode] = useState('Dark')

    const handleOpenThemeSelector =()=>{
        setShowThemeSelector(true)
    } 

    const handleCloseThemeSelector = ()=>{
        setShowThemeSelector(false)
    }

    const handleChangeInThemeMode = (_themeMode)=>{
        setThemeMode(_themeMode)
    }

    return(
        <View style={styles.container}>
            <TouchableNativeFeedback
                onPress={handleOpenThemeSelector}
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
                        <Text style={styles.themeModeText}>{themeMode}</Text>
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
            <View style={styles.developerNameContainer}>
                <Text style={styles.fromText}>from</Text>
                <Text style={styles.developerName}>AKASH</Text>
            </View>
            {
                showThemeSelector&&
                <SelectThemeDropDown
                    closeDropDown={handleCloseThemeSelector}
                    changeThemeMode={handleChangeInThemeMode}
                />
            }
        </View>
    )
}