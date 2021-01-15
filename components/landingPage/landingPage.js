import React,{useState} from 'react'

import {View,Text,StyleSheet,TextInput,TouchableOpacity,ToastAndroid} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {openDatabase} from 'react-native-sqlite-storage'
import {useDispatch} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {setUserData} from '../../store/actions/userInfoActions'
import {ErrorBox} from '../errorBox/errorBox'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                paddingVertical:20,
                paddingHorizontal:18,
                justifyContent:'space-between'
            },
            skipButtonContainer:{
                alignItems:'flex-end'
            },
            skipButton:{
                borderWidth:2,
                borderRadius:10,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                paddingHorizontal:15,
                paddingVertical:10,
                backgroundColor:theme.theme.secondaryBackground,
                elevation:5,
            },
            skipButtonText:{
                color:theme.theme.activeColor,
                fontSize:18,
                fontWeight:'bold',
                textAlignVertical:'center'
            },
            skipButtonIcon:{
                color:theme.theme.activeColor,
                marginLeft:10
            },
            messageContainer:{
                width:'100%'
            },
            messageText:{
                color:theme.theme.primaryText,
                fontSize:24,
                textAlignVertical:'center'
            },
            messageContainer1:{
                width:'100%',
                flexDirection:'row'
            },
            messageText1:{
                color:theme.theme.activeColor,
                fontSize:30,
                marginLeft:6,
                textAlignVertical:'center'
            },
            nameInputContainer:{
                marginTop:15,
                paddingHorizontal:5,
                borderBottomWidth:2,
                borderBottomColor:theme.theme.activeColor,
                flexDirection:'row',
            },
            nameInput:{
                padding:0,
                width:'94%',
                fontSize:15,
                color:theme.theme.primaryText
            },
            lengthLimitText:{
                color:theme.theme.secondaryText,
                textAlignVertical:'center',
                fontSize:15
            },
            saveButtonContainer:{
                width:'100%',
            },
            saveButton:{
                backgroundColor:theme.theme.secondaryBackground,
                paddingVertical:10,
                justifyContent:'center',
                alignItems:'center',
                elevation:5,
                borderRadius:10
            },
            saveButtonText:{
                color:theme.theme.activeColor,
                fontSize:20,
                fontWeight:'bold',
            }
        })
    )
}

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

export const LandingPage = ({closeModal,showNavigation,closeSplash})=>{
    const styles = useStyles()
    const [name,setName] = useState('')
    const [showErrBox,setShowErrBox] = useState(false)
    const [lengthLimit,setLengthLimit] = useState(10)
    const [errMessage,setErrMessage] = useState('')

    const dispatch = useDispatch()

    const onInputChange = (value)=>{
        setName(value)
        setLengthLimit(10-value.length)
    }

    const closeErrorBox = ()=>{
        setShowErrBox(false)
    }

    const showToastWithGravity=()=>{
        ToastAndroid.showWithGravity("Name can't be empty.",ToastAndroid.SHORT,ToastAndroid.CENTER)
    }

    const handleOnSkip = ()=>{
        const currDate = new Date()
        const timestamp = currDate.getTime()
        const id = timestamp.toString()

        db.transaction(txn =>{
            txn.executeSql(
                'insert into user (id,name,theme) values (?,?,?)',
                [id,'Friend','Dark'],
                (_,results)=>{
                    if(results.rowsAffected>0){
                        dispatch(setUserData(id,'Friend','Dark'))
                        closeSplash()
                        closeModal()
                        showNavigation()
                    }else{
                        setErrMessage('Unable to store data. Please try again.')
                        setShowErrBox(true)
                    }
                }
            )
        })
    }

    const handleOnSave = ()=>{
        const currDate = new Date()
        const timestamp = currDate.getTime()
        const id = timestamp.toString()

        if(name===''){
            showToastWithGravity()
            return
        }

        db.transaction(txn=>{
            txn.executeSql(
                'INSERT INTO user (id,name,theme) VALUES (?,?,?)',
                [id,name,'Dark'],
                (_,results)=>{
                    if(results.rowsAffected>0){
                        dispatch(setUserData(id,name,'Dark'))
                        closeSplash()
                        closeModal()
                        showNavigation()
                    }else{
                        setErrMessage('Unable to store data. Please try again.')
                        setShowErrBox(true)
                    }
                }
            )
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.skipButtonContainer}>
                <TouchableOpacity
                    onPress={handleOnSkip}
                    activeOpacity={.8}
                >
                    <View style={styles.skipButton}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                        <AntDesign name="right" size={18} style={styles.skipButtonIcon}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>Glad to</Text>
                <View style={styles.messageContainer1}>
                    <Text style={styles.messageText}>See</Text>
                    <Text style={styles.messageText1}>You!</Text>
                </View>
                <View style={styles.nameInputContainer}>
                    <TextInput
                        value={name}
                        maxLength={10}
                        style={styles.nameInput}
                        placeholder="Your name"
                        placeholderTextColor={'#aaa'}
                        onChangeText={onInputChange}
                    />
                    <Text style={styles.lengthLimitText}>{lengthLimit}</Text>
                </View>
            </View>
            <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                    onPress={handleOnSave}
                    activeOpacity={.8}
                >
                    <View style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
                showErrBox&&
                <ErrorBox
                    closeDialogBox={closeErrorBox}
                    message={errMessage}
                />
            }
        </View>
    )
}