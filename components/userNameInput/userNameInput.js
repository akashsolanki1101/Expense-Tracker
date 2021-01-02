import React,{useState} from 'react'

import {View,Text,TextInput,StyleSheet,TouchableWithoutFeedback,TouchableNativeFeedback,ToastAndroid} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {updateUserName} from '../../store/actions/userInfoActions'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:'100%',
                position:'absolute',
                backgroundColor:'rgba(0,0,0,.5)',
                justifyContent:'flex-end',
                alignItems:'center',
                top:0,
                left:0
            },
            popUpContainer:{
                width:'100%',
                height:150,
                backgroundColor:theme.theme.secondaryBackground,
                paddingHorizontal:18,
                paddingVertical:14,
            },
            titleContainer:{
                width:'100%'
            },
            titleText:{
                color:theme.theme.primaryText,
                fontSize:18
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
                marginTop:5
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

export const NameInput = ({closeEditor})=>{
    const styles = useStyles()
    const name = useSelector(state=>state.user.name)
    const [userName,setUserName] = useState(name)
    const [lengthLimit,setLengthLimit] = useState(10-userName.length)

    const dispatch = useDispatch()

    const onInputChangeHandler = (value)=>{
            setUserName(value)
            setLengthLimit(10-value.length)
    }

    const handleSaveButtonClick = ()=>{
        if(userName.length===0){
            showToastWithGravity()
            return
        }else{
            dispatch(updateUserName(userName))
            closeEditor()
        }
    }

    const showToastWithGravity=()=>{
        ToastAndroid.showWithGravity("Name can't be empty.",ToastAndroid.SHORT,ToastAndroid.CENTER)
    }

    return(
        <TouchableWithoutFeedback
            onPress={closeEditor}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={styles.popUpContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Enter your name</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.textInput}
                                value={userName}
                                onChangeText={onInputChangeHandler}
                                maxLength={10}
                            />
                            <Text style={styles.lengthLimitText}>{lengthLimit}</Text>
                        </View>
                        <View style={styles.responseButtonContainer}>
                            <TouchableNativeFeedback
                                onPress={closeEditor}
                            >
                                <View style={styles.responseButton}>
                                    <Text style={styles.responseButtonText}>CANCEL</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={handleSaveButtonClick}
                            >
                                <View style={styles.responseButton}>
                                    <Text style={styles.responseButtonText}>SAVE</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>    
                    </View>
                </TouchableWithoutFeedback>
                </View>
        </TouchableWithoutFeedback>
    )
} 