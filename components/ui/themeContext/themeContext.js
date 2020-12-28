import React,{createContext, useContext} from 'react'

import {light} from '../theme/lightTheme'

const defaultMode = 'light'
const defaultTheme = light.theme

export const ThemeContext = createContext({
    mode : defaultMode,
    setMode : ()=>{},
    theme: defaultTheme,
    setTheme : ()=>{}
})

export const useTheme = ()=>useContext(ThemeContext)