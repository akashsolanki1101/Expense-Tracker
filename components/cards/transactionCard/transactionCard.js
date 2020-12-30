import React from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'

import {useTheme} from "../../ui/themeContext/themeContext"

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                backgroundColor:theme.theme.secondaryBackground,
                borderRadius:15,
                height:70,
                marginTop:18,
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
                // borderWidth:2,
                // borderColor:'white',
                width:'81%',
                justifyContent:'space-between'
            },
            spendingPlaceAndCategoryContainer:{},
            placeNameContainer:{},
            placeNameText:{
                color:theme.theme.primaryText,
                fontSize:18,
                fontWeight:'bold',
            },
            categoryNameContainer:{},
            categoryName:{
                color:theme.theme.secondaryText,
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

export const TransactionCard = ()=>{
    const styles = useStyles()
    const theme = useTheme()
    const mode = theme.mode
    const imageUrl = `../../../assets/img/transactionCard/fast-food-dark.png`


    return(
        <View style={styles.container}>
            <View style={styles.categoryIconContainer}>
                <Image style={styles.categoryIcon} source={require(imageUrl)}/>
            </View>
            <View style={styles.spendingInfoContainer}>
                <View style={styles.spendingPlaceAndCategoryContainer}>
                    <View style={styles.placeNameContainer}> 
                        <Text style={styles.placeNameText}>Babaji</Text>
                    </View>
                    <View style={styles.categoryNameContainer}> 
                        <Text style={styles.categoryName}>Fast Food</Text>
                    </View>
                </View>
                <View style={styles.amountAndDateContainer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>₹ 1500</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>11/01/2021</Text>
                    </View>
                </View>
            </View>
        </View>
    )
} 