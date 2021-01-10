import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableWithoutFeedback,Modal} from 'react-native'
import {useSelector} from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'
import {TransactionCard} from '../cards/transactionCard/transactionCard'
import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'
import {PopUp} from '../popUp/popUp'
import {AddTransactionPage} from '../addTransactionPage/addTransactionPage'
import {TransactionsList} from '../transactionsList/transactionsList'
import {getCurrentWeekData,getCurrentWeekTotalAmount} from '../../dataExtractor/dataExtractor'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                paddingHorizontal:18,
            },
            upperBlock:{
                width:'100%',
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
            lowerBlock:{
                marginTop:5,
                flex:1,
            },
            transactionsContainer:{
                marginTop:15,
            },
            transactionsText:{
                color:theme.theme.primaryText,
                fontSize:22,
                fontWeight:'bold',
            },
        })
    )
}

export const IncomeHomePage = ({navigation})=>{
    const styles = useStyles()
    const theme = useTheme()
    const [title,setTitle] = useState('Statistics')
    const [openModal,setOpenModal] = useState(false)
    const [showMenuPopUp,setShowMenuPopUp] = useState(false)
    const userName = useSelector(state=>state.user.name)
    const incomeTransactionList = useSelector(state=>state.transaction.incomeData)
    const currentPeriodTransactionsList = getCurrentWeekData(incomeTransactionList,incomeTransactionList.length)
    const currentPeriodTotalIncome =  getCurrentWeekTotalAmount(currentPeriodTransactionsList,currentPeriodTransactionsList.length)


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
                />
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
                            <Text style={styles.durationText}>earned during this period</Text>
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
            </View>
        </TouchableWithoutFeedback>
    )
}