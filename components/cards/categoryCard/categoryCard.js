import React from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'

import {useTheme} from '../../ui/themeContext/themeContext'
import {CategoriesItemsData} from '../../../data/categoriesItemsData/categoriesItemsData'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:250,
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
                fontSize:25,
                fontWeight:'bold'
            },  
            categorySpendingsPercent:{
                color:theme.theme.primaryText,
                fontSize:16
            },
            categoryImageContainer:{
                position:'absolute',
                bottom:0,
                left:-20
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
                borderRadius:10,
                justifyContent:'flex-end'
            },
            percentageBarForeground:{
                width:'100%',
                borderRadius:10,
            }
        })
    )
}

export const CategoryCard = ({categoryName,style})=>{
    const styles = useStyles()

    return(
        <View style={{...styles.container,backgroundColor:CategoriesItemsData[categoryName].background,...style}}>
            <View style={styles.leftBlock}>
                <View style={styles.categoryNameContainer}>
                    <Text style={styles.categoryNameText}>{categoryName}</Text>
                    <Text style={styles.categorySpendingsPercent}>spent 48%</Text>
                </View>
                <View style={styles.categoryImageContainer}>
                    <Image style={styles.categoryImage} source={CategoriesItemsData[categoryName].imgUrl}/>
                </View>
            </View>
            <View style={styles.rightBlock}>
                <View style={{...styles.percentageBarBackground,backgroundColor:CategoriesItemsData[categoryName].percentageBar1}}>
                    <View style={{...styles.percentageBarForeground,backgroundColor:CategoriesItemsData[categoryName].percentageBar2,height:`48%`}}></View>
                </View>
            </View>
        </View>
    )
}