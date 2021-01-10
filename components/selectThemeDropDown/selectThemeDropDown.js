import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Appearance} from 'react-native-appearance'
import {useDispatch,useSelector} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {dark} from '../ui/theme/darkTheme'
import {light} from '../ui/theme/lightTheme'
import {updateUserThemeFormat} from '../../store/actions/userInfoActions'

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
            dropDownContainer:{
                width:350,
                height:255,
                backgroundColor:theme.theme.secondaryBackground,
            },
            titleTextContainer:{
                width:'100%',
                paddingVertical:18,
                paddingHorizontal:22,
            },
            titleText:{
                color:theme.theme.primaryText,
                fontSize:22
            },
            themeOptionsContainer:{
                width:'100%',
            },
            optionContainer:{
                flexDirection:'row',
                paddingHorizontal:21,
                paddingVertical:10
            },
            radioButtonContainer:{
                marginRight:20
            },
            optionTextContainer:{},
            optionText:{
                color:theme.theme.primaryText,
                fontSize:18,
            },
            responseButtonContainer:{
                flexDirection:'row',
                justifyContent:'space-between',
                paddingHorizontal:18,
                paddingVertical:8,
            },
            responseButton:{
                paddingVertical:6,
                paddingHorizontal:5
            },
            responseButtonText:{
                color:theme.theme.activeColor,
                fontSize:17
            }
        })
    )
}

export const SelectThemeDropDown = ({closeDropDown})=>{
    const styles = useStyles()
    const theme = useTheme()
    const themeFormat = useSelector(state=>state.user.themeFormat)
    const dispatch = useDispatch()

    const [mode,setMode] = useState({
        systemDefault:themeFormat==='System default'?true:false,
        dark:themeFormat==='Dark'?true:false,
        light:themeFormat==='Light'?true:false        
    })

    const handleOptionButtonClick = (option)=>{
        const newState = {
            systemDefault:false,
            dark:false,
            light:false
        }
        newState[option] = true
        setMode(newState)
    }

    const handleOkButtonClick = ()=>{
        if(mode.systemDefault){
                const colorScheme = Appearance.getColorScheme()
                console.log(colorScheme);
                if(colorScheme==='dark'){
                    theme.setMode('dark')
                    theme.setTheme(dark.theme)
                }else{
                    theme.setMode('light')
                    theme.setTheme(light.theme)
                }
                dispatch(updateUserThemeFormat('System default'))
        }else if(mode.light){
            theme.setMode('light')
            theme.setTheme(light.theme)
            dispatch(updateUserThemeFormat('Light'))
        }else if(mode.dark){
            theme.setMode('dark')
            theme.setTheme(dark.theme)
            dispatch(updateUserThemeFormat('Dark'))
        }
        closeDropDown()
    }

    return (
        <TouchableWithoutFeedback
            onPress={closeDropDown}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                >
                    <View style={styles.dropDownContainer}>
                        <View style={styles.titleTextContainer}>
                            <Text style={styles.titleText}>Choose theme</Text>
                        </View>
                        <View style={styles.themeOptionsContainer}>
                            <TouchableNativeFeedback
                                onPress={()=>{handleOptionButtonClick('systemDefault')}}
                            >
                                <View style={styles.optionContainer}>
                                    <View style={styles.radioButtonContainer}>
                                        <Ionicons name={mode.systemDefault?"radio-button-on":"radio-button-off"} color={theme.theme.activeColor} size={22}/>
                                    </View>
                                    <View style={styles.optionTextContainer}>
                                        <Text style={styles.optionText}>System default</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={()=>{handleOptionButtonClick('dark')}}
                            >
                                <View style={styles.optionContainer}>
                                    <View style={styles.radioButtonContainer}>
                                        <Ionicons name={mode.dark?"radio-button-on":"radio-button-off"} color={theme.theme.activeColor} size={22}/>
                                    </View>
                                    <View style={styles.optionTextContainer}>
                                        <Text style={styles.optionText}>Dark</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={()=>{handleOptionButtonClick('light')}}
                            >
                                <View style={styles.optionContainer}>
                                    <View style={styles.radioButtonContainer}>
                                        <Ionicons name={mode.light?"radio-button-on":"radio-button-off"} color={theme.theme.activeColor} size={22}/>
                                    </View>
                                    <View style={styles.optionTextContainer}>
                                        <Text style={styles.optionText}>Light</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.responseButtonContainer}>
                            <TouchableNativeFeedback
                                onPress={closeDropDown}
                            >
                                <View style={styles.responseButton}>
                                    <Text style={styles.responseButtonText}>CANCEL</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={handleOkButtonClick}
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