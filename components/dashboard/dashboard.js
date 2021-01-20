import React,{useState} from 'react'

import {View,Text,StyleSheet,Dimensions,TouchableOpacity,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector,useDispatch} from 'react-redux'
import {openDatabase} from 'react-native-sqlite-storage'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'
import {getCurrentWeekData,getYearData,getYearStartEndDates,getTotalAmount,getCurrWeekStartEndDates} from '../../dataExtractor/dataExtractor'
import {setTransactions} from '../../store/actions/transactionDataActions'
import {setPeriodData} from '../../store/actions/periodActions'
import {Loader} from '../loader/loader'
import {YearInput} from '../yearInput/yearInput'

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
            },togglePeriodContainer:{
                position:'relative'
            },
            togglePeriodText:{
                color:theme.theme.primaryText,
                fontSize:16,
                color:theme.theme.primaryText,
                fontWeight:'bold',
                marginRight:10,
            },
            toggleButton:{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
            },
            toggleButtonIcon:{
                color:theme.theme.primaryText
            },
            optionsContainer:{
                width:140,
                backgroundColor:theme.theme.secondaryBackground,
                elevation:10,
                borderWidth:1,
                borderColor:theme.theme.secondaryText,
                borderRadius:20,
                position:'absolute',
                right:0,
                top:4,
                overflow:'hidden'
            },
            optionsTextContainer:{
                width:'100%',
                justifyContent:'center',
                paddingHorizontal:15,
                paddingVertical:12,
            },
            optionsText:{
                color:theme.theme.primaryText,
                fontSize:20,

            },
            chartContainer:{
                width:'100%',
            }
        })
    )
}

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

export const DashboardPage = ()=>{
    const [showPeriodOptions,setShowPeriodOptions] = useState(false)
    
    const theme = useTheme()
    const styles = useStyles()

    const currPeriodType = useSelector(state=>state.period.period)
    const selectedYear = useSelector(state=>state.period.year)
    const expenseTransactionsList = useSelector(state=>state.transaction.expenseData)
    const incomeTransactionsList = useSelector(state=>state.transaction.incomeData)
    
    const [showYearInput,setShowYearInput] = useState(false)
    const [showLoader,setShowLoader] = useState(false)
    const [year,setYear] = useState(selectedYear)

    const dispatch = useDispatch()
    
    let currentPeriodExpenseTransactionsList
    let currentPeriodIncomeTransactionsList
    
    if(currPeriodType==='week')
    {
        currentPeriodExpenseTransactionsList = getCurrentWeekData(expenseTransactionsList,expenseTransactionsList.length)
        currentPeriodIncomeTransactionsList = getCurrentWeekData(incomeTransactionsList,incomeTransactionsList.length)   
    }else{
        currentPeriodExpenseTransactionsList = getYearData(expenseTransactionsList,expenseTransactionsList.length)
        currentPeriodIncomeTransactionsList = getYearData(incomeTransactionsList,incomeTransactionsList.length)
    }
    
    const currentPeriodTotalExpense = getTotalAmount(currentPeriodExpenseTransactionsList,currentPeriodExpenseTransactionsList.length)
    const currentPeriodTotalIncome = getTotalAmount(currentPeriodIncomeTransactionsList,currentPeriodExpenseTransactionsList.length)

    const amountDiff = currentPeriodTotalIncome - currentPeriodTotalExpense 
    const remainingBalance = amountDiff < 0 ? `- ₹ ${-1 * amountDiff}` : `₹ ${amountDiff}` 


    const chartData = [{
        data: currentPeriodExpenseTransactionsList,
        strokeWidth:2,
        color:(opacity=1)=>`rgba(86,142,218,1)`,
    },{
        data: currentPeriodIncomeTransactionsList,
        strokeWidth:2,
        color:(opacity=1)=>`rgba(189,79,130,1)`,
    }]

    const handleShowPeriodOptions = ()=>{
        setShowPeriodOptions(true)
    }

    const handleClosePeriodOptions = ()=>{
        setShowPeriodOptions(false)
    }

    const handleShowYearInput = ()=>{
        handleClosePeriodOptions()
        setShowYearInput(true)
    }

    const handleCloseYearInput = ()=>{
        setShowYearInput(false)
    }

    const handleShowLoader = ()=>{
        setShowLoader(true)
    }

    const handleCloseLoader = ()=>{
        setShowLoader(false)
    }

    const handleYearInputChange = (value)=>{
        setYear(value)
    }

    const fetchTransactions = (dates,periodType,year)=>{
        db.transaction(txn=>{
            txn.executeSql(
                `SELECT * FROM transactions WHERE key>=${dates[0]} AND key<=${dates[1]} ORDER BY id DESC`,
                [],
                (_,results)=>{
                    const length = results.rows.length
                    let expense = []
                    let income = []
                    if(length>0){
                        for(let i=0;i<length;i++){
                            if(results.rows.item(i).category==='Income'){
                                income.push(results.rows.item(i))
                            }else{
                                expense.push(results.rows.item(i))
                            }
                        }
                    }
                    dispatch(setTransactions(expense,income))
                    if(periodType==='week'){
                        setYear('')
                    }
                    dispatch(setPeriodData(periodType,year))
                    handleCloseLoader()
                }
            )
        })
    }

    const handleWeekButtonClick = ()=>{
        if(currPeriodType==='week'){
            return
        }
        else{
            handleShowLoader()
            const dates = getCurrWeekStartEndDates()
            fetchTransactions(dates,'week','')
        }
    }

    const handleYearInputSubmit = ()=>{
        handleCloseYearInput()
        if(currPeriodType==='year'&&selectedYear===year){
            return
        }else{
            handleShowLoader()
            const dates = getYearStartEndDates(year)
            fetchTransactions(dates,'year',year)
        }
    }

    return(
        <TouchableWithoutFeedback
            onPress={handleClosePeriodOptions}
        >
            <View style={styles.container}>
                <View style={styles.upperBlock}>
                    <View style={styles.totalAmountContainer}>
                        <Text style={styles.title}>Total</Text>
                        <Text style={styles.amountText}>{remainingBalance}</Text>
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
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleShowPeriodOptions}
                            >
                                <View style={styles.toggleButton}>
                                    <Text style={styles.togglePeriodText}>{currPeriodType==='year'?selectedYear:'Weekly'}</Text>
                                    <AntDesign name="caretdown" size={15} style={styles.toggleButtonIcon}/>
                                </View>
                            </TouchableOpacity>
                            {   
                                showPeriodOptions&&
                                <View style={styles.optionsContainer}>
                                    <TouchableNativeFeedback
                                        onPress={handleWeekButtonClick}
                                    >
                                        <View style={styles.optionsTextContainer}>
                                            <Text style={styles.optionsText}>Week</Text>   
                                        </View>
                                    </TouchableNativeFeedback>
                                    <TouchableNativeFeedback
                                        onPress={handleShowYearInput}
                                    >
                                        <View style={styles.optionsTextContainer}>
                                            <Text style={styles.optionsText}>Year</Text>   
                                        </View>
                                    </TouchableNativeFeedback>
                                </View> 
                            }
                        </View>
                    </View>
                    <View style={styles.chartContainer}>
                        <Chart
                            data={chartData}
                            transparent={true}
                            withInnerLines={true}
                            listenThemeChange={true}
                            height={Dimensions.get("window").height * .50}
                            toolTipTextColor={theme.theme.primaryText}
                            periodType={currPeriodType}
                        />
                    </View>
                </View>
                {
                    showYearInput&&
                    <YearInput
                        close={handleCloseYearInput}
                        value={year}
                        inputChange={handleYearInputChange}
                        onSubmit={handleYearInputSubmit}
                    />
                }
                {
                    showLoader&&
                    <Loader/>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}