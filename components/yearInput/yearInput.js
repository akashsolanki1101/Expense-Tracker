import React,{useState} from 'react'

import {View,Text,TextInput,StyleSheet,TouchableWithoutFeedback,TouchableNativeFeedback,ToastAndroid} from 'react-native'
import {useSelector} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {ErrorBox} from '../errorBox/errorBox'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
               width:'100%',
               height:'100%',
               backgroundColor:'rgba(0,0,0,.5)',
               position:'absolute',
               top:0,
               left:0,
               justifyContent:'center',
               alignItems:'center' 
            },
            inputContainer:{
                width:350,
                backgroundColor:theme.theme.secondaryBackground,
                paddingVertical:20,
                paddingHorizontal:20,
            },
            titleText:{
                color:theme.theme.primaryText,
                fontSize:20,
            },
            textInputContainer:{
                flexDirection:'row',
                borderBottomColor:theme.theme.activeColor,
                borderBottomWidth:2,
                marginVertical:16,
                justifyContent:'space-between',
                paddingHorizontal:5,
            },
            textInput:{
                width:'90%',
                color:theme.theme.primaryText,
                fontSize:17,
                padding:0
            },
            lengthLimitText:{
                color:theme.theme.secondaryText,
                textAlignVertical:'center',
                fontSize:15
            },
            responseButtonContainer:{
                flexDirection:'row',
                justifyContent:'space-between',
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

export const YearInput= ({close,inputChange,value,onSubmit})=>{
    const styles = useStyles()
    
    const selectedYear  = useSelector(state=>state.period.year)
    const [yearInput,setYearInput] = useState(selectedYear)
    const [lengthLimit,setLengthLimit] = useState(4-selectedYear.length)

    const handleInputChange = (data)=>{
        setLengthLimit(4-data.length)
        inputChange(data)
        setYearInput(data)
    }

    const handleOkButtonClick = ()=>{
        const regex = /^\d{4}$/
        if(!value.match(regex)){
            ToastAndroid.showWithGravity('Please enter a valid year.',ToastAndroid.SHORT,ToastAndroid.CENTER)
            return
        }else{
            onSubmit()
        }
    }

    return(
        <TouchableWithoutFeedback
            onPress={close}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                >
                    <View style={styles.inputContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Enter year</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.textInput}
                                value={yearInput}
                                onChangeText={handleInputChange}
                                maxLength={4}
                                keyboardType='number-pad'
                            />
                            <Text style={styles.lengthLimitText}>{lengthLimit}</Text>
                        </View>
                        <View style={styles.responseButtonContainer}>
                            <TouchableNativeFeedback
                                onPress={close}
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