const initialState = {
    name:'Friend',
    themeFormat:'Dark'
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'UPDATE_USER_NAME':
            return{
                ...state,
                name:action.name
            }
        
        case 'UPDATE_THEME_FORMAT':
            return{
                ...state,
                themeFormat:action.themeFormat
            }    
        
        default:
            return state
    }
}

export default reducer