import React, {useEffect,useState} from 'react'

import {StatusBar} from 'react-native'
import {Appearance, AppearanceProvider} from 'react-native-appearance' 

import {ThemeContext} from  '../themeContext/themeContext'
import {dark} from '../theme/darkTheme'
import {light} from '../theme/lightTheme'

const ManageThemeProvider = ({children})=>{
    const [themeState,setThemeState] = useState('dark')
    const [theme,setTheme] = useState(dark.theme)

    const setMode = (mode)=>{
        setThemeState(mode)
    }

    const toggleTheme = (theme)=>{
        setTheme(theme)
    }

    useEffect(()=>{
        const subscription = Appearance.addChangeListener(({colorScheme})=>{
            setThemeState(colorScheme)
        })
        return ()=> subscription.remove()
    },[])

return(
    <ThemeContext.Provider value={{mode:themeState,setMode,theme:theme,toggleTheme}}>
        <StatusBar barStyle={themeState==='dark'?'light-content':'dark-content'} backgroundColor={themeState==='dark'?'#000':'#fff'}/>
        {children}
    </ThemeContext.Provider>
)}

export const ThemeManager = ({children})=>{
    return(        
        <AppearanceProvider>
            <ManageThemeProvider>{children}</ManageThemeProvider>
        </AppearanceProvider>    
)}
