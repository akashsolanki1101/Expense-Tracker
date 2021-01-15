const initialState = {
    id:'',
    name:'',
    themeFormat:'Dark'
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_USER_DATA':{
            return{
                ...state,
                id:action.id,
                name:action.name,
                themeFormat:action.themeFormat
            }
        }

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