import React from 'react'

import {View,Text,StyleSheet,Image,TouchableNativeFeedback} from 'react-native'

import {useTheme} from '../../ui/themeContext/themeContext'
import {CategoriesItemsData} from '../../../data/categoriesItemsData/categoriesItemsData'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'92%',
                height:250,
                borderRadius:20,
                flexDirection:'row',
                overflow:'hidden',
                paddingVertical:10,
                paddingHorizontal:10,
            },
            leftBlock:{
                width:'72%',
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
            },
            categoryImage:{
                width:120,
                height:120,
            },
            rightBlock:{
                width:'28%',
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

export const CategoryCard = ({categoryName,style,style1,onClick,showPercentage,percentage})=>{
    const styles = useStyles()

    return(
        <TouchableNativeFeedback
            onPress={()=>onClick(categoryName)}
        >
            <View style={{...styles.container,...style,backgroundColor:CategoriesItemsData[categoryName].background}}>
                <View style={styles.leftBlock}>
                    <View style={styles.categoryNameContainer}>
                        <Text style={styles.categoryNameText}>{categoryName}</Text>
                        {
                            showPercentage&&
                            <Text style={styles.categorySpendingsPercent}>spent {percentage}%</Text>
                        }
                    </View>
                    <View style={styles.categoryImageContainer}>
                        <Image style={{...styles.categoryImage,...style1}} source={CategoriesItemsData[categoryName].imgUrl}/>
                    </View>
                </View>
                {
                    showPercentage&&
                    <View style={styles.rightBlock}>
                        <View style={{...styles.percentageBarBackground,backgroundColor:CategoriesItemsData[categoryName].percentageBar1}}>
                            <View style={{...styles.percentageBarForeground,backgroundColor:CategoriesItemsData[categoryName].percentageBar2,height:`${percentage}%`}}></View>
                        </View>
                    </View>
                }
            </View>
        </TouchableNativeFeedback>
    )
}