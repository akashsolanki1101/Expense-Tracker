import React,{useEffect,useCallback,useState} from 'react'

import {View,StyleSheet,StatusBar,Modal} from 'react-native'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import {openDatabase} from 'react-native-sqlite-storage'
import {useDispatch} from 'react-redux'
import {Appearance} from 'react-native-appearance'

import {StackNavigator} from '../../navigation/navigation'
import {useTheme} from '../ui/themeContext/themeContext'
import {LandingPage} from '../landingPage/landingPage'
import {setUserData} from '../../store/actions/userInfoActions'
import {setTransactions} from '../../store/actions/transactionDataActions'
import {dark} from '../ui/theme/darkTheme'
import {light} from '../ui/theme/lightTheme'
import {SplashScreen} from '../splashScreen/splashScreen'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground
            }
        })
    )
}

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

export const Layout = ()=>{
    const styles = useStyles()
    const theme = useTheme()
    const lightKeys = theme.mode==='light'?true:false
    const [showEnterNamePage,setShowEnterNamePage] = useState(false)
    const [showSplash,setShowSplash] = useState(true)
    const [showNavigation,setShowNavigation] = useState(false)

    const dispatch = useDispatch()

    const handleOpenEnterPage = ()=>{
        setShowEnterNamePage(true)
    }

    const handleCloseEnterPage = ()=>{
        setShowEnterNamePage(false)
    }

    const handleCloseSplash = ()=>{
        setShowSplash(false)
    }

    const handleShowNavigation = ()=>{
        setShowNavigation(true)
    }

    const changeColor = useCallback(async()=>{
        try{
            const res = await changeNavigationBarColor(theme.theme.secondaryBackground,lightKeys);
            // console.log(res);
        }catch(e){
            // console.log(e);
        }   
    },[theme])

    const fetchUserInfo = useCallback(()=>{
        db.transaction(tx=>{
            tx.executeSql(
                'SELECT * FROM user',
                [], 
                (_,results)=>{
                    const length = results.rows.length
                    if(length===0){
                        handleOpenEnterPage()
                    }else{
                        const data = results.rows.item(0)
                        if(data.theme === 'System default'){
                            const colorScheme = Appearance.getColorScheme()
                            if(colorScheme==='dark'){
                                theme.setMode('dark')
                                theme.setTheme(dark.theme)
                            }else{
                                theme.setMode('light')
                                theme.setTheme(light.theme)
                            }
                        }else if(data.theme === 'Light'){
                            theme.setMode('light')
                            theme.setTheme(light.theme)
                        }else if(data.theme === 'Dark'){
                            theme.setMode('dark')
                            theme.setTheme(dark.theme)
                        }
                        dispatch(setUserData(data.id,data.name,data.theme))
                    }
                },
        
            );
        })
    },[db])

    const fetchTransactions = useCallback(()=>{
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT * FROM transactions ORDER BY id DESC',
                [],
                (_,results)=>{
                    const length = results.rows.length
                    if(length>0){
                        const expense = []
                        const income = []
                        for(let i=0;i<length;i++){
                            if(results.rows.item(i).category==='Income'){
                                income.push(results.rows.item(i))
                            }else{
                                expense.push(results.rows.item(i))
                            }
                        }
                        dispatch(setTransactions(expense,income))
                        handleCloseSplash()
                        handleShowNavigation()
                    }else{
                        handleCloseSplash()
                        handleShowNavigation()
                    }
                }
            ); 
            },
        );
    },[db])


    useEffect(()=>{
        changeColor()
        fetchUserInfo()
        fetchTransactions()
    },[changeColor,fetchUserInfo,fetchTransactions])
    

    return(
        <View style={styles.container}>
            <StatusBar barStyle={theme.mode==='dark'?'light-content':'dark-content'} backgroundColor={theme.theme.primaryBackground}/>
            <Modal
                visible={showEnterNamePage}
            >
                <LandingPage
                    closeModal={handleCloseEnterPage}
                    showNavigation={handleShowNavigation}
                    closeSplash={handleCloseSplash}
                />
            </Modal>
            {
                showSplash&&
                <SplashScreen/>
            }
            {
                showNavigation&&
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
            }
        </View>
    )
}

