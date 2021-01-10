export const addExpenseTransaction = (data)=>{
    return{
        type:'ADD_EXPENSE_TRANSACTION',
        data
    }
}

export const deleteExpenseTransaction = (id)=>{
    return{
        type:'DELETE_EXPENSE_TRANSACTION',
        id
    }
}

export const addIncomeTransaction = (data)=>{
    return{
        type:'ADD_INCOME_TRANSACTION',
        data
    }
}

export const deleteIncomeTransaction = (id)=>{
    return{
        type:'DELETE_INCOME_TRANSACTION',
        id
    }
}
