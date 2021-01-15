const initialState = {
    expenseData:[],
    incomeData:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_TRANSACTIONS':{
            return{
                ...state,
                expenseData:action.expenseData,
                incomeData:action.incomeData
            }
        }

        case 'ADD_EXPENSE_TRANSACTION':{
            const oldExpenseData = [...state.expenseData]
            oldExpenseData.splice(0,0,action.data)
            return{
                ...state,
                expenseData:oldExpenseData
            }
        }

        case 'DELETE_EXPENSE_TRANSACTION':{
            const oldData = [...state.expenseData]
            const updatedData = oldData.filter(item=>item.id!==action.id)
            return{
                ...state,
                expenseData:updatedData
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

        case 'DELETE_INCOME_TRANSACTION':{
            const oldData = [...state.incomeData]
            const updatedData = oldData.filter(item=>item.id!==action.id)
            return{
                ...state,
                incomeData:updatedData
            }
        }

        default:
            return state
    }
}

export default reducer