import React from 'react'

import {Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {SpendingHomePage} from '../components/spendings/spendingHomePage'
import {IncomeHomePage} from "../components/income/incomeHomePage"
import {AnalysisPage} from '../components/analysis/analysis'
import {CategoriesPage} from '../components/categories/categories'
import {SettingsPage} from '../components/settings/settings'
import {useTheme} from '../components/ui/themeContext/themeContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const HomeNavigator = ()=>{
    const theme = useTheme()
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor:theme.theme.activeColor,
                tabStyle:{
                    backgroundColor:theme.theme.secondaryBackground,
                    justifyContent:'center',
                },

            }}
        >
            <Tab.Screen
                name="Spendings"
                component={SpendingHomePage}
                options={{
                    tabBarIcon:({color})=>(<FontAwesome name="minus" size={20} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Spendings</Text>)
                }}
            />
            <Tab.Screen
                name="Income"
                component={IncomeHomePage}
                options={{
                    tabBarIcon:({color})=>(<FontAwesome name="plus" size={20} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Incomes</Text>)
                }}
            />
        </Tab.Navigator>
    )
}

export const StackNavigator = ()=>{
    const theme = useTheme()
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="Categories"
                component={CategoriesPage}
                options={{
                    headerStyle:{
                        backgroundColor:theme.theme.primaryBackground,
                    },
                    headerTitleStyle:{
                        color:theme.theme.primaryText
                    },
                    headerBackImage:()=><AntDesign name="left" size={22} color={theme.theme.primaryText}/>
                }}
            />
            <Stack.Screen
                name="Analysis"
                component={AnalysisPage}
                options={{
                    headerStyle:{
                        backgroundColor:theme.theme.primaryBackground,
                    },
                    headerTitleStyle:{
                        color:theme.theme.primaryText
                    },
                    headerBackImage:()=><AntDesign name="left" size={22} color={theme.theme.primaryText}/>
                }}
            /><Stack.Screen
                name="Settings"
                component={SettingsPage}
                options={{
                    headerStyle:{
                        backgroundColor:theme.theme.primaryBackground,
                    },
                    headerTitleStyle:{
                        color:theme.theme.primaryText,
                    },
                    headerBackImage:()=><AntDesign name="left" size={22} color={theme.theme.primaryText}/>
                }}
            />
        </Stack.Navigator>
    )
}