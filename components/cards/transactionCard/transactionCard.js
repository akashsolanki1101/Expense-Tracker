import React from 'react'

import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {useDispatch} from 'react-redux'

import {useTheme} from "../../ui/themeContext/themeContext"
import {CategoriesItemsData} from '../../../data/categoriesItemsData/categoriesItemsData'
import {deleteExpenseTransaction,deleteIncomeTransaction} from '../../../store/actions/transactionDataActions'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'99%',
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
            categoryName:{
                color:theme.theme.secondaryText,
                textTransform:'capitalize'
            },
            amountAndDateContainer:{
                alignItems:'flex-end',
                justifyContent:'center'
            },
            amountText:{
                color:theme.theme.primaryText,
                fontWeight:'bold'
            },
            dateText:{
                color:theme.theme.secondaryText,
            },
            swipeableChildContainer:{
                width:'100%',
                justifyContent:'center',
                alignItems:'center'
            },
            trashIconContainer: {
                height:'100%',
                width:50,
                justifyContent: 'center',
                alignItems: 'center',
            },
            trashIcon:{
                width:50,
                height:70,
                justifyContent:'center',
                alignItems:'center'
            }
        })
    )
}

export const TransactionCard = ({id,categoryName,placeName,amount,date,transactionType})=>{
    const styles = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()
    const mode = theme.mode
    const finalAmount = transactionType==='Expense'?`- ₹ ${amount}`:`₹ ${amount}`
    let imageUrl

    if(transactionType==='Expense'){
        imageUrl = mode==='dark'?CategoriesItemsData[categoryName].iconDark:CategoriesItemsData[categoryName].iconLight
    }

    const handleOnDeleteButtonClick = ()=>{
        if(transactionType==='Expense'){
            dispatch(deleteExpenseTransaction(id))
        }else if(transactionType==='Income'){
            dispatch(deleteIncomeTransaction(id))
        }
    }

    const leftSwipe = () => {
        return (
            <View style={styles.trashIconContainer}>
                <TouchableOpacity 
                    onPress={handleOnDeleteButtonClick} 
                    activeOpacity={0.6}
                >
                    <View style={styles.trashIcon}>
                        <FontAwesome name='trash' color={theme.theme.activeColor} size={26}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <Swipeable
            renderLeftActions={leftSwipe}
            childrenContainerStyle={styles.swipeableChildContainer}
        >
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
        </Swipeable>
    )
} 