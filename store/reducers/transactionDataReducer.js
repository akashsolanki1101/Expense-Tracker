const initialState = {
    expenseData:[],
    incomeData:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE_TRANSACTION':{
            const oldExpenseData = [...state.expenseData]
            const updatedExpenseData = oldExpenseData.splice(0,0,action.data)
            return{
                ...state,
                expenseData:updatedExpenseData
            }
        }

        case 'ADD_INCOME_TRANSACTION':{
            const oldIncomeData = [...state.incomeData]
            const updatedIncomeData = oldIncomeData.splice(0,0,action.data)
            return{
                ...state,
                incomeData:updatedIncomeData
            }
        }

        default:
            return state
    }
}

export default reducer