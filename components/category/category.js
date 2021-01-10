import React from 'react'

import {View,Text,StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryCard} from '../cards/categoryCard/categoryCard'
import {TransactionsList} from '../transactionsList/transactionsList'
import {getCurrentWeekTotalAmount,getCurrentWeekData} from '../../dataExtractor/dataExtractor'

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
            transactionsTextContainer:{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center'
            },
            transactionsText:{
                color:theme.theme.primaryText,
                fontSize:22,
                fontWeight:'bold',
            },
            categoryExpense:{
                color:'white',
                fontSize:17,
                fontWeight:'bold'
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
    const currPeriodExpenseList = getCurrentWeekData(expenseTransactionsList,expenseTransactionsList.length)
    const currPeriodTotalExpense = getCurrentWeekTotalAmount(currPeriodExpenseList,currPeriodExpenseList.length)
    let categoryExpense = 0

    for(let i=0;i<selectedCategoryTransactionsList.length;i++){
        categoryExpense += selectedCategoryTransactionsList[i].amount 
    }

    const categoryPercent = currPeriodTotalExpense!==0?((categoryExpense/currPeriodTotalExpense)*100).toFixed(2):0
    console.log(currPeriodExpenseList,currPeriodTotalExpense,categoryExpense,categoryPercent);

    return(
        <View style={styles.container}>
            <CategoryCard
                categoryName={categoryName}
                onClick={()=>{}}
                showPercentage={true}
                percentage={categoryPercent}
            />
            <View style={styles.transactionsContainer}>
                <View style={styles.transactionsTextContainer}>
                    <Text style={styles.transactionsText}>Transactions</Text>
                    <Text style={styles.categoryExpense}>₹ {categoryExpense}</Text>
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