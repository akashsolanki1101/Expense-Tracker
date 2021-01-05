export const addExpenseTransaction = (data)=>{
    return{
        type:'ADD_EXPENSE_TRANSACTION',
        data
    }
}

export const addIncomeTransaction = (data)=>{
    return{
        type:'ADD_INCOME_TRANSACTION',
        data
    }
}