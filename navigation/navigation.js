import React from 'react'

import {Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {ExpenseHomePage} from '../components/expense/expenseHomePage'
import {IncomeHomePage} from "../components/income/incomeHomePage"
import {DashboardPage} from '../components/dashboard/dashboard'
import {CategoriesPage} from '../components/categories/categories'
import {SettingsPage} from '../components/settings/settings'
import {CategoryPage} from '../components/category/category'
import {useTheme} from '../components/ui/themeContext/themeContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const HomeNavigator = ()=>{
    const theme = useTheme()
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor:theme.theme.activeColor,
                style:{
                    borderTopWidth:1,
                    borderTopColor:theme.theme.secondaryBackground
                },
                tabStyle:{
                    backgroundColor:theme.theme.secondaryBackground,
                    justifyContent:'center',
                },

            }}
        >
            <Tab.Screen
                name="Expense"
                component={ExpenseHomePage}
                options={{
                    tabBarIcon:({color})=>(<AntDesign name="upcircleo" size={18} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Expense</Text>)
                }}
            />
            <Tab.Screen
                name="Income"
                component={IncomeHomePage}
                options={{
                    tabBarIcon:({color})=>(<AntDesign name="downcircleo" size={18} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Income</Text>)
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
                name="Dashboard"
                component={DashboardPage}
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
            <Stack.Screen
                name="Category"
                component={CategoryPage}
                options={{
                    headerStyle:{
                        backgroundColor:theme.theme.primaryBackground,
                    },
                    headerTitle:' ',
                    headerTitleStyle:{
                        color:theme.theme.primaryText,
                    },
                    headerBackImage:()=><AntDesign name="left" size={22} color={theme.theme.primaryText}/>
                }}
            />
        </Stack.Navigator>
    )
}