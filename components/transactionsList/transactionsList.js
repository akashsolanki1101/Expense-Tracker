import React from 'react'

import {View,FlatList,Text,StyleSheet} from 'react-native'

import {TransactionCard} from '../cards/transactionCard/transactionCard'
import {useTheme} from '../ui/themeContext/themeContext'

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
            }
        })
    )
}

export const TransactionsList = ({data,listHeaderComp,handleScroll,transactionType})=>{
    const styles = useStyles()

    const listEmptyComp = <Text style={styles.messageText}>No transaction found!</Text>

    return(
        <FlatList
            data={data}
            keyExtractor={item=>item.id}
            renderItem={({item})=>
                <TransactionCard
                    categoryName={item.category}
                    amount={item.amount}
                    placeName={item.particular}
                    date={item.date}
                    transactionType={transactionType}
                />
            }
            ListHeaderComponent={listHeaderComp}
            ListEmptyComponent={listEmptyComp}
            onScroll={handleScroll}
        />
    )
}