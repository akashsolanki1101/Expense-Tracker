const getCurrentWeekDates = ()=>{
    const currDate = new Date
    const week = []

    for(let i=1;i<=7;i++){
        const day = currDate.getDate() - currDate.getDay() + i;
        const newDate = new Date(currDate.setDate(day)).toISOString().slice(0,10)
        const parts = newDate.split('-')
        const finalDateFormat = `${parts[2]}/${parts[1]}/${parts[0]}`
        week.push(finalDateFormat)
    }

    return week
}

export const getCurrentWeekData = (data,length)=>{
    const finalData = []
    const week = getCurrentWeekDates()

    for(let i=0;i<7;i++){
        let sum = 0;
        for(let j=0;j<length;j++){
            if(week[i]===data[j].date)
            {
                sum += data[j].amount
            }
        }
        finalData.push(sum)
    }

    return finalData
}

export const getCurrentWeekTotalAmount = (data,length)=>{
    let total = 0

    for(let i=0;i<length;i++){
        total = total + data[i]
    }

    return total
}

export const getCurrentYearData = (data,length)=>{
    const currYear = new Date().getFullYear()
    console.log(currYear);
}