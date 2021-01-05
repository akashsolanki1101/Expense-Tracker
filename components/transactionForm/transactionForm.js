import React,{useState} from 'react'

import {View,Text,StyleSheet,TextInput,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryListDropDown} from '../categoryListDropDown/categoryListDropDown'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:'100%',
                paddingHorizontal:20,
                paddingVertical:10,
                justifyContent:'space-between',
            },
            formElement:{
                marginBottom:20
            },
            inputType:{
                flexDirection:'row',
                alignItems:'center'
            },
            inputTypeIconContainer:{
                width:30,
                marginRight:12,
            },  
            inputTypeIcon:{
                color:theme.theme.primaryText,
            },
            inputTypeText:{
                color:theme.theme.primaryText,
                fontSize:16
            },
            textInput:{
                color:theme.theme.primaryText,
                paddingVertical:0,
                borderBottomColor:theme.theme.secondaryText,
                borderBottomWidth:2,
                marginTop:10   
            },
            categoryInput:{
                width:'100%',
                borderBottomWidth:2,
                borderBottomColor:theme.theme.secondaryText,
                flexDirection:'row',
                marginTop:12,
                justifyContent:'space-between'
            },
            categoryText:{
                color:theme.theme.primaryText,
                paddingHorizontal:5
            },
            responseButtonContainer:{
                width:'100%',
                flexDirection:'row',
                justifyContent:'space-between'
            },
            responseButton:{
                width:'100%',
                backgroundColor:theme.theme.secondaryBackground,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:10,
                paddingVertical:10
            },
            responseButtonText:{
                color:theme.theme.activeColor,
                fontSize:20,
            }
        })
    )
}

export const ExpenseTransactionForm = ({formData,onInputChangeHandler,closeModal,openCategoryList,transactionType})=>{
    const styles = useStyles()

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formElement}>
                    <View style={styles.inputType}>
                        <View style={styles.inputTypeIconContainer}>
                            <MaterialIcons name="date-range" size={22} style={styles.inputTypeIcon}/>
                        </View>
                        <Text style={styles.inputTypeText}>Date (dd/mm/yyyy)</Text>
                    </View>
                    <TextInput
                        value={formData.date}
                        onChangeText={(value)=>onInputChangeHandler(value,'date')}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.formElement}>
                    <View style={styles.inputType}>
                        <View style={styles.inputTypeIconContainer}>
                            <Foundation name="clipboard-notes" size={24} style={styles.inputTypeIcon}/>
                        </View>
                        <Text style={styles.inputTypeText}>{transactionType==='Expense'?'Particular':'Miscellaneous'}</Text>
                    </View>
                    <TextInput
                        value={formData.particular}
                        onChangeText={(value)=>onInputChangeHandler(value,'particular')}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.formElement}>
                    <View style={styles.inputType}>
                        <View style={styles.inputTypeIconContainer}>
                            <FontAwesome name="rupee" size={22} style={styles.inputTypeIcon}/>
                        </View>
                        <Text style={styles.inputTypeText}>Amount</Text>
                    </View>
                    <TextInput
                        keyboardType={'number-pad'}
                        value={formData.amount}
                        onChangeText={(value)=>onInputChangeHandler(value,'amount')}
                        style={styles.textInput}
                    />
                </View>
                {
                    transactionType==='Expense'?
                    <View style={styles.formElement}>
                        <View style={styles.inputType}>
                            <View style={styles.inputTypeIconContainer}>
                                <FontAwesome name="list-ul" size={22} style={styles.inputTypeIcon}/>
                            </View>
                            <Text style={styles.inputTypeText}>Category</Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={openCategoryList}
                        >
                            <View style={styles.categoryInput}>
                                <Text style={styles.categoryText}>{formData.category}</Text>
                                <FontAwesome name="caret-down" size={22} style={styles.inputTypeIcon}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    :null
                }
            </View>
            <View style={styles.responseButtonContainer}>
                <View style={{width:'40%',borderRadius:10,elevation:10,overflow:'hidden'}}>
                    <TouchableNativeFeedback
                        onPress={closeModal}
                    >
                        <View style={styles.responseButton}>
                            <Text style={styles.responseButtonText}>Cancel</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{width:'40%',borderRadius:10,elevation:10,overflow:'hidden'}}>
                    <TouchableNativeFeedback>
                        <View style={styles.responseButton}>
                            <Text style={styles.responseButtonText}>Save</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    )
}