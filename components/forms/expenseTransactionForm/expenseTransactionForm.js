import React,{useState} from 'react'

import {View,Text,StyleSheet,TextInput,KeyboardAvoidingView,Platform} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'

import {useTheme} from '../../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                paddingHorizontal:20,
                paddingVertical:10,
            },
            formElement:{
                marginBottom:20
            },
            inputType:{
                flexDirection:'row',
                // borderWidth:1,
                alignItems:'center'
            },
            inputTypeIcon:{
                color:theme.theme.primaryText,
                marginRight:15,
            },
            inputTypeText:{
                color:theme.theme.primaryText,
                fontSize:16
            },
            textInput:{
                color:theme.theme.primaryText,
                padding:0,
                borderBottomColor:theme.theme.secondaryText,
                borderBottomWidth:2,
                marginTop:10   
            }
        })
    )
}

export const ExpenseTransactionForm = ()=>{
    const styles = useStyles()
    const theme = useTheme()

    const [formData,setFormData] = useState({
        date:String,
        amount:Number,
        category:String,
        item:String
    })

    const onInputChangeHandler = (value,data_type)=>{
        setFormData(prevState=>{
            return{
                ...prevState,
                data_type:value,
            }
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.formElement}>
                <View style={styles.inputType}>
                    <MaterialIcons name="date-range" size={22} style={styles.inputTypeIcon}/>
                    <Text style={styles.inputTypeText}>Date (dd/mm/yyyy)</Text>
                </View>
                <TextInput
                    value={formData.date}
                    onChangeText={(value)=>{onInputChangeHandler(value,'date')}}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.formElement}>
                <View style={styles.inputType}>
                    <FontAwesome name="rupee" size={22} style={styles.inputTypeIcon}/>
                    <Text style={styles.inputTypeText}>Amount</Text>
                </View>
                <TextInput
                    keyboardType={'number-pad'}
                    value={formData.amount}
                    onChangeText={(value)=>{onInputChangeHandler(value,'amount')}}
                    style={styles.textInput}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS==='ios'?"padding":'height'}
            >
                <View style={styles.formElement}>
                    <View style={styles.inputType}>
                        <Foundation name="clipboard-notes" size={24} style={styles.inputTypeIcon}/>
                        <Text style={styles.inputTypeText}>Item/Place/Type</Text>
                    </View>
                    <TextInput
                        value={formData.item}
                        onChangeText={(value)=>{onInputChangeHandler(value,'item')}}
                        style={styles.textInput}
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={styles.formElement}>
            <View style={styles.inputType}>
                <FontAwesome name="list-ul" size={22} style={styles.inputTypeIcon}/>
                <Text style={styles.inputTypeText}>Category</Text>
            </View>
            <View>
                <FontAwesome name="caret-down" size={22} style={styles.inputTypeIcon}/>
            </View>
        </View>
        </View>
    )
}