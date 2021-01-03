import React,{useState} from 'react'

import {View,Text,StyleSheet,TextInput} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'

import {useTheme} from '../../ui/themeContext/themeContext'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{

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
                    <MaterialIcons name="date-range" size={22} color={theme.theme.primaryText}/>
                    <Text>Date</Text>
                </View>
                <TextInput/>
            </View>
            <View style={styles.formElement}>
                <View style={styles.inputType}>
                    <FontAwesome name="rupee" size={22} color={theme.theme.primaryText}/>
                    <Text>Amount</Text>
                </View>
                <TextInput
                    keyboardType={'number-pad'}
                />
            </View>
            <View style={styles.formElement}>
                <View style={styles.inputType}>
                    <FontAwesome name="list-ul" size={22} color={theme.theme.primaryText}/>
                    <Text>Category</Text>
                </View>
                <View></View>
            </View>
            <View style={styles.formElement}>
                <View style={styles.inputType}>
                    <Foundation name="clipboard-notes" size={22} color={theme.theme.primaryText}/>
                    <Text>Item/Place/Type</Text>
                </View>
                <TextInput/>
            </View>
        </View>
    )

}