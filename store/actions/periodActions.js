export const setPeriodData = (periodType,year)=>{
    return{
        type:'SET_PERIOD_DATA',
        periodType,
        year
    }
}