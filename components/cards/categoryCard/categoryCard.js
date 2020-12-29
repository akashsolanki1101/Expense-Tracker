import React from 'react'

import {View,Text,StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'

import {useTheme} from '../../ui/themeContext/themeContext'
import {Colors} from '../../ui/colors/colors'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                // borderWidth:1,
                // borderColor:'white',
                backgroundColor:Colors.food,
                height:230,
                borderRadius:15,
            },
        })
    )
}

export const CategoryCard = ()=>{
    const styles = useStyles()
    return(
        <View style={styles.container}>
            <Slider
                value={1}
                minimumValue={0}
                maximumValue={100}
                style={{
                           
                }}
            />
        </View>
    )
}