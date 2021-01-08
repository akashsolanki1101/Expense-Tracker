import React from 'react'

import {View,Text,StyleSheet,Dimensions} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector} from 'react-redux'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'
import {getCurrentWeekData,getCurrentWeekTotalAmount} from '../../dataExtractor/dataExtractor'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                justifyContent:'space-between'
            },
            upperBlock:{
                width:'100%',
                paddingHorizontal:18,
                paddingVertical:10,
            },
            totalAmountContainer:{
                width:'100%',
            },
            title:{
                color:theme.theme.primaryText,
                fontSize:17,
            },
            amountText:{
                color:theme.theme.primaryText,
                fontSize:25,
                fontWeight:'bold',
                marginTop:5,
            },
            cardsContainer:{
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:30,
            },
            card:{
                width:'45%',
                borderRadius:5,
            },
            linearGradient:{
                width:'100%',
                paddingHorizontal:10,
                paddingVertical:15,
                borderRadius:5,
            },
            cardTitleContainer:{
                flexDirection:'row',
                alignItems:'center'
            },
            cardIcon:{
                color:theme.theme.primaryText,
                marginRight:10,
            },
            cardTitle:{
                color:theme.theme.primaryText,
                fontWeight:'bold',
                fontSize:16
            },
            cardAmountText:{
                color:theme.theme.primaryText,
                marginTop:10,
                fontSize:15,
                fontWeight:'bold',
            },
            lowerContainer:{
                width:'100%',
                height:'64%',
                paddingHorizontal:18,
                justifyContent:'space-between'
            },
            header:{
                width:'100%',
                flexDirection:'row',
                justifyContent:'space-between'
            },
            statsText:{
                color:theme.theme.primaryText,
                borderBottomColor:theme.theme.activeColor,
                borderBottomWidth:2,
                fontSize:16,
                fontWeight:'bold'
            },
            togglePeriodText:{
                color:theme.theme.primaryText,
                fontSize:16,
                color:theme.theme.primaryText,
                fontWeight:'bold'
            },
            chartContainer:{
                width:'100%',
            }
        })
    )
}

export const DashboardPage = ()=>{
    const styles = useStyles()
    const expenseTransactionsList = useSelector(state=>state.transaction.expenseData)
    const incomeTransactionsList = useSelector(state=>state.transaction.incomeData)
    const currentPeriodExpenseTransactionsList = getCurrentWeekData(expenseTransactionsList,expenseTransactionsList.length)
    const currentPeriodIncomeTransactionsList = getCurrentWeekData(incomeTransactionsList,incomeTransactionsList.length)
    const currentPeriodTotalExpense = getCurrentWeekTotalAmount(currentPeriodExpenseTransactionsList,currentPeriodExpenseTransactionsList.length)
    const currentPeriodTotalIncome = getCurrentWeekTotalAmount(currentPeriodIncomeTransactionsList,currentPeriodExpenseTransactionsList.length)

    const chartData = [{
        data: currentPeriodExpenseTransactionsList,
        strokeWidth:2,
        color:(opacity=1)=>`rgba(86,142,218,1)`,
    },{
        data: currentPeriodIncomeTransactionsList,
        strokeWidth:2,
        color:(opacity=1)=>`rgba(189,79,130,1)`,
    }]

    return(
        <View style={styles.container}>
            <View style={styles.upperBlock}>
                <View style={styles.totalAmountContainer}>
                    <Text style={styles.title}>Total</Text>
                    <Text style={styles.amountText}>₹ {currentPeriodTotalIncome - currentPeriodTotalExpense}</Text>
                </View>
                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <LinearGradient
                            style={styles.linearGradient}
                            colors={['#2f2faf','#568eda','#6bc0f0']}
                            start={{ x: 0.7, y: .8 }}
                            end={{x:0,y:0}}
                        >
                            <View style={styles.cardTitleContainer}>
                                <AntDesign name="upcircleo" size={18} style={styles.cardIcon}/>
                                <Text style={styles.cardTitle}>Expense</Text>
                            </View>
                            <Text style={styles.cardAmountText}>₹ {currentPeriodTotalExpense}</Text>
                        </LinearGradient>
                    </View>
                    <View style={{...styles.card,backgroundColor:'#89306d'}}>
                        <LinearGradient
                            style={styles.linearGradient}
                            colors={['#89306d','#cc709a','#f497b5']}
                            start={{ x: .7, y: .8 }}
                            end={{x:0,y:0}}
                        >
                            <View style={styles.cardTitleContainer}>
                                <AntDesign name="downcircleo" size={18} style={styles.cardIcon}/>
                                <Text style={styles.cardTitle}>Income</Text>
                            </View>
                            <Text style={styles.cardAmountText}>₹ {currentPeriodTotalIncome}</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.header}>
                    <View style={styles.statsTextContainer}>
                        <Text style={styles.statsText}>Statistics</Text>
                    </View>
                    <View style={styles.togglePeriodContainer}>
                        <Text style={styles.togglePeriodText}>Weekly</Text>
                    </View>
                </View>
                <View style={styles.chartContainer}>
                    <Chart
                        data={chartData}
                        transparent={true}
                        withInnerLines={true}
                        listenThemeChange={true}
                        height={Dimensions.get("window").height * .50}
                    />
                </View>
            </View>
        </View>
    )
}