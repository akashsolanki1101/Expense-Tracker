import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {useTheme} from '../ui/themeContext/themeContext'
import {Chart} from '../chart/chart'
import {TransactionCard} from '../cards/transactionCard/transactionCard'
import {AddTransactionButton} from '../addTransactionButton/addTransactionButton'
import {PopUp} from '../popUp/popUp'

const useStyles=()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
                paddingHorizontal:18,
                paddingVertical:20
            },
            upperBlock:{
                width:'100%',
                // borderWidth:1,
                // borderColor:'orange',
                flexDirection:'row',
                justifyContent:'space-between',
            },
            helloText:{
                // borderWidth:1,
                // borderColor:'orange',
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
                // borderWidth:2,
                // borderColor:'red',
                marginRight:10,
                justifyContent:'space-between',
                paddingVertical:12
            },
            middleBlock:{
                width:'100%',
                marginTop:10
            },
            statsContainer:{
                width:'100%',
                flexDirection:'row',
                justifyContent:'space-between'
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
                // borderWidth:1,
                // borderColor:'white',
                marginTop:15,
            },
            transactionsContainer:{},
            transactionsTextContainer:{},
            transactionsText:{
                color:theme.theme.primaryText,
                fontSize:22,
                fontWeight:'bold'
            },
        })
    )
}

export const SpendingHomePage = ({navigation})=>{
    const styles = useStyles()
    const theme = useTheme()

    // console.log(props);

    const [showMenuPopUp,setShowMenuPopUp] = useState(false)

    const handleShowMenu = ()=>{
        setShowMenuPopUp(true)
    }

    const handleHideMenu = ()=>{
        setShowMenuPopUp(false)
    }

    return (
        <TouchableNativeFeedback
            onPress={handleHideMenu}
        >
            <View style={styles.container}>
                <View style={styles.upperBlock}>
                    <View style={styles.textContainer}>
                        <Text style={styles.helloText}>Hello,</Text>
                        <Text style={styles.nameText}>Akash</Text>
                    </View>
                    <View style={styles.menuButtonContainer}>
                        <TouchableNativeFeedback
                            onPress={handleShowMenu}
                        >
                            <Entypo name='dots-three-vertical' color={theme.theme.primaryText} size={21}/>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={styles.middleBlock}>
                    <View style={styles.statsContainer}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountText}>₹ 1,673.80</Text>
                            <Text style={styles.durationText}>spent during this period</Text>
                        </View>
                        <View style={styles.statisticsTextContainer}>
                            <Text style={styles.statisticsText}>Statistics</Text>
                        </View>
                    </View>
                    <View style={styles.chartContainer}>
                        <Chart/>
                    </View>
                </View>
                <View style={styles.lowerBlock}>
                    <View style={styles.transactionsContainer}>
                        <View style={styles.transactionsTextContainer}>
                            <Text style={styles.transactionsText}>Transactions</Text>
                        </View>
                    </View>
                    <TransactionCard/>
                    <TransactionCard/>
                </View>
                <AddTransactionButton/>
                {
                    showMenuPopUp&&
                    <PopUp 
                        navigation={navigation}
                        hideMenu={handleHideMenu}
                    />
                }
            </View>
        </TouchableNativeFeedback>
    )
}