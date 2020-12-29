import React from 'react'

import {Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {SpendingHomePage} from '../components/spendings/spendingHomePage'
import {IncomeHomePage} from "../components/income/incomeHomePage"
import {useTheme} from '../components/ui/themeContext/themeContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const SpedingsNavigator = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Spendings"
                component={SpendingHomePage}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export const IncomeNavigator = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Income"
                component={IncomeHomePage}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export const TabNavigator = ()=>{
    const theme = useTheme()
    return(
        <Tab.Navigator
            // tabBar={()=>{}}
            tabBarOptions={{
                activeTintColor:theme.theme.activeColor,
                tabStyle:{
                    backgroundColor:theme.theme.secondaryBackground,
                    justifyContent:'center',
                }
            }}
        >
            <Tab.Screen
                name="Spendings"
                component={SpedingsNavigator}
                options={{
                    tabBarIcon:({color})=>(<FontAwesome name="minus" size={20} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Spendings</Text>)
                }}

            />
            <Tab.Screen
                name="Income"
                component={IncomeNavigator}
                options={{
                    tabBarIcon:({color})=>(<FontAwesome name="plus" size={20} color={color}/>),
                    tabBarLabel:({color})=>(<Text style={{color:color}}>Incomes</Text>)
                }}
            />
        </Tab.Navigator>
    )
}