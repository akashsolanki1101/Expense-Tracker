import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableWithoutFeedback,Modal,TouchableOpacity} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import {openDatabase} from 'react-native-sqlite-storage'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'
import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'
import {PopUp} from '../popUp/popUp'
import {AddTransactionPage} from '../addTransactionPage/addTransactionPage'
import {TransactionsList} from '../transactionsList/transactionsList'
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
            },
            upperBlock:{
                width:'100%',
                paddingHorizontal:18,

            },
            upperBlock1:{
                width:'100%',
                flexDirection:'row',
                justifyContent:'space-between',
                paddingTop:10
            },
            helloText:{
                color:theme.theme.secondaryText,
                fontSize:25,
                fontWeight:'normal'
            },
            nameText:{
                color:theme.theme.primaryText,
                fontSize:40,
                fontWeight:'bold',
            },
            menuButtonContainer:{
                marginRight:5,
                justifyContent:'space-between',
                paddingVertical:12
            },
            menuButton:{
                paddingVertical:4,
            },
            middleBlock:{
                width:'100%',
            },
            statsContainer:{
                width:'100%',
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:10
            },
            amountContainer:{},
            amountText:{
                fontSize:20,
                color:theme.theme.primaryText,
                fontWeight:'bold'
            },
            durationText:{
                fontSize:13,
                color:theme.theme.secondaryText
            },
            statisticsTextContainer:{
                justifyContent:'center',
                alignItems:'center'
            },
            statisticsText:{
                color:theme.theme.primaryText
            },
            chartContainer:{
                width:'100%',
                height:232,
                marginTop:20,
                elevation:5,
                shadowColor:'#fff'
            },
            togglePeriodButtonContainer:{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
            },
            togglePeriodButton:{
                width:100,
                justifyContent:'center',
                alignItems:'center',
                paddingVertical:8
            },
            togglePeriodButtonText:{
                color:theme.theme.secondaryText,
                fontSize:18,
                fontWeight:'bold'
            },
            activeToggleButtonText:{
                color:theme.theme.activeColor,
            },
            lowerBlock:{
                marginTop:5,
                flex:1,
                paddingHorizontal:18,
            },
            transactionsContainer:{
                marginTop:10,
            },
            transactionsText:{
                color:theme.theme.primaryText,
                fontSize:22,
                fontWeight:'bold',
            },
        })
    )
}

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

export const IncomeHomePage = ({navigation})=>{
    const styles = useStyles()
    const theme = useTheme()
    
    const [title,setTitle] = useState('Statistics')
    const [openModal,setOpenModal] = useState(false)
    const [showMenuPopUp,setShowMenuPopUp] = useState(false)
    const [showYearInput,setShowYearInput] = useState(false)
    const [showLoader,setShowLoader] = useState(false)
    const selectedYear = useSelector(state=>state.period.year)
    const [year,setYear] = useState(selectedYear)

    const userName = useSelector(state=>state.user.name)
    const incomeTransactionList = useSelector(state=>state.transaction.incomeData)
    const currPeriodType = useSelector(state=>state.period.period)
    
    let currentPeriodTransactionsList

    if(currPeriodType==='week')
    {
        currentPeriodTransactionsList = getCurrentWeekData(incomeTransactionList,incomeTransactionList.length)
    }else{
        currentPeriodTransactionsList = getYearData(incomeTransactionList,incomeTransactionList.length)
    }    
    
    const currentPeriodTotalIncome =  getTotalAmount(currentPeriodTransactionsList,currentPeriodTransactionsList.length)

    const dispatch = useDispatch()

    const chartData = [{
        data: currentPeriodTransactionsList,
        strokeWidth:2,
        color:(opacity=1)=>`rgba(255,255,255,0.8)`,
    }]
    
    const handleShowMenu = ()=>{
        setShowMenuPopUp(true)
    }

    const handleHideMenu = ()=>{
        setShowMenuPopUp(false)
    }

    const handleOpenModal = ()=>{
        setOpenModal(true)
    }

    const handleCloseModal = ()=>{
        setOpenModal(false)
    }

    const handleShowYearInput = ()=>{
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
                    dispatch(setPeriodData(periodType,year))
                    if(periodType==='week'){
                        setYear('')
                    }
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

    const handleYearButtonClick = ()=>{
        handleShowYearInput()
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

    

    const handleScroll = (event)=>{
        if(event.nativeEvent.contentOffset.y>280){
            setTitle('Transactions')
        }else if(event.nativeEvent.contentOffset.y<280){
            setTitle('Statistics')
        }
    }


    const listHeaderComp = (
        <View style={styles.middleBlock}>
            <View style={styles.chartContainer}>
                <Chart
                    data={chartData}
                    transparent={false}
                    withInnerLines={false}
                    listenThemeChange={false}
                    height={230}
                    backgroundGradientFrom={'rgba(137,48,109,1)'}
                    backgroundGradientTo={'rgba(244,151,181,1)'}
                    toolTipTextColor={'black'}
                    periodType={currPeriodType}
                />
            </View>
            <View style={styles.togglePeriodButtonContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleWeekButtonClick}
                >
                    <View style={styles.togglePeriodButton}>
                        <Text style={{...styles.togglePeriodButtonText,...currPeriodType==='week'?styles.activeToggleButtonText:{}}}>Week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleYearButtonClick}
                >
                    <View style={styles.togglePeriodButton}>
                        <Text style={{...styles.togglePeriodButtonText,...currPeriodType==='year'?styles.activeToggleButtonText:{}}}>Year</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.transactionsContainer}>
                <View style={styles.transactionsTextContainer}>
                    <Text style={styles.transactionsText}>Transactions</Text>
                </View>
            </View>
        </View>
    )

    return (
        <TouchableWithoutFeedback
            onPress={handleHideMenu}
        >
            <View style={styles.container}>
                <View style={styles.upperBlock}>
                    <View style={styles.upperBlock1}>
                        <View style={styles.textContainer}>
                            <Text style={styles.helloText}>Hello,</Text>
                            <Text style={styles.nameText}>{userName}</Text>
                        </View>
                        <View style={styles.menuButtonContainer}>
                            <TouchableWithoutFeedback
                                onPress={handleShowMenu}
                            >
                                <View style={styles.menuButton}>
                                    <Entypo name='dots-three-vertical' color={theme.theme.primaryText} size={21}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountText}>₹ {currentPeriodTotalIncome}</Text>
                            <Text style={styles.durationText}>earned during {currPeriodType==='year'?`year ${selectedYear}`:'this week'}</Text>
                        </View>
                        <View style={styles.statisticsTextContainer}>
                            <Text style={styles.statisticsText}>{title}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lowerBlock}>
                    <TransactionsList
                        data={incomeTransactionList}
                        listHeaderComp={listHeaderComp}
                        handleScroll={handleScroll}
                        transactionType={'Income'}
                    />
                </View>
                <AddTransactionButton
                    click={handleOpenModal}
                />
                <Modal
                    visible={openModal}
                >
                    <AddTransactionPage
                        closeModal={handleCloseModal}
                        transactionTyppe={'Income'}
                    />
                </Modal>
                {
                    showMenuPopUp&&
                    <PopUp 
                        navigation={navigation}
                        hideMenu={handleHideMenu}
                        showCategory={false}
                    />
                }
                {
                    showLoader&&
                    <Loader/>
                }
                {
                    showYearInput&&
                    <YearInput
                        close={handleCloseYearInput}
                        inputChange={handleYearInputChange}
                        value={year}
                        onSubmit={handleYearInputSubmit}
                    />

                }
            </View>
        </TouchableWithoutFeedback>
    )
}