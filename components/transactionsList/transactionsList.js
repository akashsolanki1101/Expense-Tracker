import React from 'react'

import {View,Text,StyleSheet,SectionList} from 'react-native'
import {useSelector} from 'react-redux'

import {TransactionCard} from '../cards/transactionCard/transactionCard'
import {useTheme} from '../ui/themeContext/themeContext'
import {formatData} from '../../dataExtractor/dataExtractor'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
            },
            messageText:{
                fontSize:18,
                color:theme.theme.secondaryText,
                textAlign:'center',
                marginTop:30
            },
            sectionTitleContainer:{
                paddingHorizontal:5,
                marginTop:4
            },
            sectionTitle:{
                color:theme.theme.secondaryText,
                fontSize:18,
                fontWeight:'bold'
            }
        })
    )
}

export const TransactionsList = ({data,listHeaderComp,handleScroll,transactionType})=>{
    const styles = useStyles()

    const currPeriodType = useSelector(state=>state.period.period)

    const listEmptyComp = <Text style={styles.messageText}>No transaction found!</Text>

    const formattedData = data.length===0 ? data : formatData(data,data.length,currPeriodType)

    return(
        <SectionList
            sections={formattedData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => 
                <TransactionCard
                    id={item.id}
                    categoryName={item.category}
                    amount={item.amount}
                    placeName={item.particular}
                    date={item.date}
                    transactionType={transactionType}
                />
            }
            renderSectionHeader={({ section: { title ,data} }) =>{
                    if(data.length===0){
                        return null
                    }
                    return(
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>{title}</Text>
                        </View>
                    )
                }
            }
            ListHeaderComponent={listHeaderComp}
            ListEmptyComponent={listEmptyComp}
            onScroll={handleScroll}
            stickySectionHeadersEnabled={true}
        />
    )
}