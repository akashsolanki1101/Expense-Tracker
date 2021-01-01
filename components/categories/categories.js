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
                // borderWidth:1,
                // borderColor:'white',
                paddingVertical:10,
                paddingHorizontal:10
            },
            categoryCardStyle:{
                width:150,
                marginHorizontal:10
            }
        })
    )
}

export const CategoriesPage = ()=>{

    const styles = useStyles()
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
                            />
                        )
                    }}
                />
            }
            </View>
        </View>
    )
}