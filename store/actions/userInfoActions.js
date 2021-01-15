export const setUserData = (id,name,themeFormat)=>{
    return{
        type : 'SET_USER_DATA',
        id,
        name,
        themeFormat
    }
}


export const updateUserThemeFormat = (themeFormat)=>{
    return{
        type:'UPDATE_THEME_FORMAT',
        themeFormat
    }
}

export const updateUserName = (name)=>{
    return{
        type:'UPDATE_USER_NAME',
        name
    }
}