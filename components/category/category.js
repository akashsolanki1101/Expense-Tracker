import React from 'react'

import {View,Text,StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryCard} from '../cards/categoryCard/categoryCard'
import {TransactionsList} from '../transactionsList/transactionsList'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                alignItems:'center',
                paddingVertical:15,
            },
            categoryName:{
                color:theme.theme.primaryText
            },
            transactionsContainer:{
                width:'100%',
                marginTop:15,
                paddingHorizontal:18,
            },
            transactionsText:{
                color:theme.theme.primaryText,
                fontSize:22,
                fontWeight:'bold',
            },
            listContainer:{
                paddingHorizontal:18
            }
        })
    )
}

export const CategoryPage = ({route})=>{
    const styles = useStyles()
    const categoryName = route.params.categoryName
    const expenseTransactionsList = useSelector(state=>state.transaction.expenseData)
    const selectedCategoryTransactionsList = expenseTransactionsList.filter(item=>item.category===categoryName)

    return(
        <View style={styles.container}>
            <CategoryCard
                    categoryName={categoryName}
                    onClick={()=>{}}
            />
            <View style={styles.transactionsContainer}>
                <View style={styles.transactionsTextContainer}>
                    <Text style={styles.transactionsText}>Transactions</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                <TransactionsList
                    data={selectedCategoryTransactionsList}
                    listHeaderComp={null}
                    handleScroll={()=>{}}
                    transactionType={'Expense'}
                /> 
            </View>
           
        </View>
    )
}