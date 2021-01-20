const initialState = {
    period : 'week',
    year:''
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_PERIOD_DATA':{
            return{
                ...state,
                period:action.periodType,
                year:action.year
            }
        }

        default:
            return state
    }
}

export default reducer