import React from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'

import {useTheme} from '../../ui/themeContext/themeContext'
import {Colors} from '../../ui/colors/colors'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                // backgroundColor:Colors.groceryCard.background,
                height:210,
                borderRadius:15,
                flexDirection:'row',
                overflow:'hidden',
                paddingVertical:10,
                paddingHorizontal:10,
            },
            leftBlock:{
                width:'70%',
            },
            categoryNameContainer:{
                width:'100%'
            },
            categoryNameText:{
                color:theme.theme.primaryText,
                fontSize:30,
                fontWeight:'bold'
            },  
            categorySpendingsPercent:{
                color:theme.theme.primaryText,
                fontSize:16
            },
            categoryImageContainer:{
                position:'absolute',
                bottom:0
            },
            categoryImage:{
                width:100,
                height:100,
            },
            rightBlock:{
                width:'30%',
                justifyContent:'flex-end',   
                alignItems:'flex-end',
                paddingRight:15
            },
            percentageBarBackground:{
                width:'14%',
                height:'100%',
                // backgroundColor:Colors.groceryCard.percentageBar1,
                borderRadius:10,
                justifyContent:'flex-end'
            },
            percentageBarForeground:{
                width:'100%',
                // backgroundColor:Colors.groceryCard.percentageBar2,
                borderRadius:10,
            }
        })
    )
}

export const CategoryCard = ({categoryName,percent,imgUrl})=>{
    const styles = useStyles()
    console.log(imgUrl);

    return(
        <View style={{...styles.container,backgroundColor:Colors[categoryName].background}}>
            <View style={styles.leftBlock}>
                <View style={styles.categoryNameContainer}>
                    <Text style={styles.categoryNameText}>{categoryName}</Text>
                    <Text style={styles.categorySpendingsPercent}>spent {percent}%</Text>
                </View>
                <View style={styles.categoryImageContainer}>
                    <Image style={styles.categoryImage} source={imgUrl}/>
                </View>
            </View>
            <View style={styles.rightBlock}>
                <View style={{...styles.percentageBarBackground,backgroundColor:Colors[categoryName].percentageBar1}}>
                    <View style={{...styles.percentageBarForeground,backgroundColor:Colors[categoryName].percentageBar2,height:`${percent}%`}}></View>
                </View>
            </View>
        </View>
    )
}