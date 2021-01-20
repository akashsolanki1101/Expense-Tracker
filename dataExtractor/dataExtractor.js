export const getCurrWeekStartEndDates = ()=>{
    const currDate = new Date
    const currDate1 = new Date
    
    const temp = currDate.getDay()===0 ? 7 : currDate.getDay()

    
    const firstDay = currDate.getDate() - temp + 1;
    const newDate = new Date(currDate.setDate(firstDay)).toISOString().slice(0,10)
    const parts = newDate.split('-')
    const startDate = parseInt(`${parts[0]}${parts[1]}${parts[2]}`)

    const lastDay = currDate1.getDate() - temp + 7;
    const newDate1 = new Date(currDate1.setDate(lastDay)).toISOString().slice(0,10)
    const parts1 = newDate1.split('-')
    const endDate = parseInt(`${parts1[0]}${parts1[1]}${parts1[2]}`)
    
    const dates = [startDate,endDate]

    return dates
}

export const getYearStartEndDates = (year)=>{
    const startDate = parseInt(`${year}0101`)
    const endDate = parseInt(`${year}1231`)
    const dates = [startDate,endDate]


    return dates
}

// const getCurrentWeekDates = ()=>{
//     const currDate = new Date()
//     const week = []


//     for(let i=1;i<=7;i++){
//         const temp = currDate.getDay()===0 ? 7 : currDate.getDay()
//         const day = currDate.getDate() - temp + i;
//         const newDate = new Date(currDate.setDate(day)).toISOString().slice(0,10)
//         const parts = newDate.split('-')
//         const finalDateFormat = `${parts[2]}/${parts[1]}/${parts[0]}`
//         week.push(finalDateFormat)
//     }

//     return week
// }

export const getCurrentWeekData = (data,length)=>{
    const currDate = new Date()
    const temp = currDate.getDay()===0 ? 7 : currDate.getDay()
    const startDate = currDate.getDate() - temp + 1;

    const finalData = [0,0,0,0,0,0,0]

    for(let i=0;i<length;i++){
        const parts = data[i].date.split('/')
        const txnDate = parseInt(parts[0])
        const index = txnDate - startDate
        finalData[index] += data[i].amount
    }

    return finalData
}

export const getYearData = (data,length)=>{
    const finalData = [0,0,0,0,0,0,0,0,0,0,0,0]

    for(let i=0;i<length;i++){
        const parts = data[i].date.split('/')
        const month = parseInt(parts[1])
        finalData[month-1] += data[i].amount 
    }
    
    return finalData
}

export const getTotalAmount = (data,length)=>{
    let total = 0

    for(let i=0;i<length;i++){
        total = total + data[i]
    }

    return total
}

export const formatData = (list,length,periodType)=>{
    const weekData = [{title:'Monday',data:[]},{title:'Tuesday',data:[]},{title:'Wednesday',data:[]},{title:'Thursday',data:[]},{title:'Friday',data:[]},{title:'Saturday',data:[]},{title:'Sunday',data:[]}]
    const yearData = [{title:'January',data:[]},{title:'February',data:[]},{title:'March',data:[]},{title:'April',data:[]},{title:'May',data:[]},{title:'June',data:[]},{title:'July',data:[]},{title:'August',data:[]},{title:'September',data:[]},{title:'October',data:[]},{title:'November',data:[]},{title:'December',data:[]}]

    const weekDates = getCurrWeekStartEndDates()
    const firstDate = weekDates[0]%100

    if(periodType==='week'){
        for(let i=0;i<length;i++){
            const parts = list[i].date.split('/')
            const temp = parseInt(parts[0])
            const index = temp - firstDate
            const txn = {
                id : list[i].id,
                amount : list[i].amount,
                category: list[i].category,
                date : list[i].date,
                particular : list[i].particular,
                key : list[i].key
            }
            weekData[index]['data'].push(txn)
        }
    }else if(periodType==='year'){
        for(let i=0;i<length;i++){
            const parts = list[i].date.split('/')
            const month = parseInt(parts[1])
            const index = month - 1
            const txn = {
                id : list[i].id,
                amount : list[i].amount,
                category: list[i].category,
                date : list[i].date,
                particular : list[i].particular,
                key : list[i].key
            }
            yearData[index]['data'].push(txn)
        }
    }

    if(periodType==='week'){
        return weekData
    }else if(periodType==='year'){
        return yearData
    }
}
