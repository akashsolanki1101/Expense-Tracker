import React from 'react'

import {View,Text,StyleSheet,FlatList,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'

import {useTheme} from '../ui/themeContext/themeContext'
import {CategoriesList} from '../../data/categoriesList/categoriesList'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                width:'100%',
                height:'100%',
                backgroundColor:'rgba(0,0,0,.5)',
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
                top:0,
                left:0,
                zIndex:2
            },
            titleContainer:{
                width:'100%',
                elevation:5,
                paddingHorizontal:15,
                paddingVertical:12,
                backgroundColor:theme.theme.secondaryBackground,
            },
            title:{
                color:theme.theme.primaryText,
                fontSize:20,
            },
            listContainer:{
                width:350,
                height:350,
                backgroundColor:theme.theme.secondaryBackground,
            },
            listItem:{
                paddingHorizontal:15,
                paddingVertical:10,
                borderBottomWidth:1,
                borderBottomColor:theme.theme.secondaryText
            },
            listItemText:{
                color:theme.theme.primaryText,
                fontSize:18,
            }
        })
    )
}

export const CategoryListDropDown = ({onSelect,closeCategoryList})=>{
    const styles = useStyles()

    
    return(
        <TouchableWithoutFeedback
            onPress={closeCategoryList}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                >
                    <View style={styles.listContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Select Category</Text>
                        </View>
                        <FlatList
                            keyExtractor={item=>item}
                            data={CategoriesList}
                            renderItem={({item})=>{
                                return(
                                    <TouchableNativeFeedback
                                        onPress={()=>onSelect(item,'category')}
                                    >
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemText}>{item}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )
}