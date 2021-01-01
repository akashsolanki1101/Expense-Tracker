import React from 'react'

import {View,Text,StyleSheet,FlatList} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoryCard} from '../cards/categoryCard/categoryCard'
import {CategoriesList} from '../../data/categoriesList/categoriesList'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground
            },
            categoriesListContainer:{
                width:'100%',
                paddingVertical:10,
                paddingHorizontal:10
            },
            categoryCardStyle:{
                width:165,
                marginHorizontal:8
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
            {
                    <FlatList
                    keyExtractor={item=>item}
                    data={CategoriesList}
                    horizontal={true}
                    renderItem={({item})=>{
                        return(
                            <CategoryCard
                                categoryName={item}
                                style={styles.categoryCardStyle}
                                style1={styles.categoryIconStyle}
                                onClick={handleCategoryCardClick}
                            />
                        )
                    }}
                />
            }
            </View>
        </View>
    )
}