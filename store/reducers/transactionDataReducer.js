const initialState = {
    expenseData:[],
    incomeData:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE_TRANSACTION':{
            const oldExpenseData = [...state.expenseData]
            oldExpenseData.splice(0,0,action.data)
            return{
                ...state,
                expenseData:oldExpenseData
            }
        }

        case 'ADD_INCOME_TRANSACTION':{
            const oldIncomeData = [...state.incomeData]
            oldIncomeData.splice(0,0,action.data)
            return{
                ...state,
                incomeData:oldIncomeData
            }
        }

        default:
            return state
    }
}

export default reducer