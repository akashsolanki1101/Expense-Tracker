import React from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {useTheme} from "../../ui/themeContext/themeContext"
import {CategoriesItemsData} from '../../../data/categoriesItemsData/categoriesItemsData'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                backgroundColor:theme.theme.secondaryBackground,
                borderRadius:15,
                height:70,
                marginVertical:10,
                paddingHorizontal:10,
                paddingVertical:8,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                elevation:4
            },
            categoryIconContainer:{
                backgroundColor:theme.theme.categoryIconBackground,
                width:50,
                height:50,
                borderRadius:25,
                alignItems:'center',
                justifyContent:'center'
            },
            categoryIcon:{
                width:30,
                height:30,
            },
            spendingInfoContainer:{
                flexDirection:'row',
                width:'81%',
                justifyContent:'space-between'
            },
            spendingPlaceAndCategoryContainer:{
                width:'70%',
            },
            placeNameContainer:{
                overflow:'hidden',

            },
            placeNameText:{
                color:theme.theme.primaryText,
                fontSize:18,
                fontWeight:'bold',
                textTransform:'capitalize'
            },
            categoryNameContainer:{},
            categoryName:{
                color:theme.theme.secondaryText,
                textTransform:'capitalize'
            },
            amountAndDateContainer:{
                alignItems:'flex-end',
                justifyContent:'center'
            },
            amountContainer:{},
            amountText:{
                color:theme.theme.primaryText,
                fontWeight:'bold'
            },
            dateContainer:{},
            dateText:{
                color:theme.theme.secondaryText,
            },
        })
    )
}

export const TransactionCard = ({categoryName,placeName,amount,date,transactionType})=>{
    const styles = useStyles()
    const theme = useTheme()
    const mode = theme.mode
    const finalAmount = transactionType==='Expense'?`- ₹ ${amount}`:`₹ ${amount}`
    let imageUrl

    if(transactionType==='Expense'){
        imageUrl = mode==='dark'?CategoriesItemsData[categoryName].iconDark:CategoriesItemsData[categoryName].iconLight
    }

    return(
        <View style={styles.container}>
            <View style={styles.categoryIconContainer}>
            {
                transactionType==='Expense'
                ?<Image style={styles.categoryIcon} source={imageUrl}/>
                :<FontAwesome name="rupee" size={26} color={theme.theme.activeColor}/>
            }
            </View>
            <View style={styles.spendingInfoContainer}>
                <View style={styles.spendingPlaceAndCategoryContainer}>
                    <View style={styles.placeNameContainer}> 
                        <Text numberOfLines={1} style={styles.placeNameText}>{placeName}</Text>
                    </View>
                    <View style={styles.categoryNameContainer}> 
                        <Text style={styles.categoryName}>{categoryName}</Text>
                    </View>
                </View>
                <View style={styles.amountAndDateContainer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>{finalAmount}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
} 