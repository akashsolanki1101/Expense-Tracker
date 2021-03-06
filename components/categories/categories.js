import React from 'react'

import {View,StyleSheet,FlatList} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryCard} from '../cards/categoryCard/categoryCard'
import {CategoriesList} from '../../data/categoriesList/categoriesList'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
            },
            categoriesListContainer:{
                flex:1,
                paddingHorizontal:10,
            },
            categoryCardStyle:{
                width:'45%',
                height:200,
                marginVertical:10,
                marginHorizontal:'2.5%'
            },
            categoryIconStyle:{
                width:80,
                height:80
            }
        })
    )
}

export const CategoriesPage = ({navigation})=>{
    const styles = useStyles()

    handleCategoryCardClick = (categoryName)=>{
        navigation.navigate('Category',{
            categoryName:categoryName
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.categoriesListContainer}>
                <FlatList
                    keyExtractor={item=>item}
                    data={CategoriesList}
                    // horizontal={true}
                    numColumns={2}
                    renderItem={({item})=>{
                        return(
                            <CategoryCard
                                categoryName={item}
                                style={styles.categoryCardStyle}
                                style1={styles.categoryIconStyle}
                                onClick={handleCategoryCardClick}
                                showPercentage={false}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}