import React,{useState} from 'react'

import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import {useDispatch} from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {useTheme} from '../ui/themeContext/themeContext'
import {ExpenseTransactionForm} from '../transactionForm/transactionForm'
import {CategoryListDropDown} from '../categoryListDropDown/categoryListDropDown'
import {addIncomeTransaction} from '../../store/actions/transactionDataActions'
import {addExpenseTransaction} from '../../store/actions/transactionDataActions'
import {ErrorBox} from '../errorBox/errorBox'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:theme.theme.primaryBackground,
            },
            header:{
                width:'100%',
                paddingVertical:15,
                paddingHorizontal:15,
                flexDirection:'row',
                alignItems:'center',
                elevation:5
            },
            backButtonContainer:{
                marginRight:30,
                overflow:'hidden',
                borderRadius:12,
                justifyContent:'center'
            },
            backButton:{
                padding:2,
                borderRadius:12
            },
            headerLabelContainer:{
            },
            headerLabel:{
                color:theme.theme.primaryText,
                fontSize:20
            },
            buttonsContainer:{
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                paddingVertical:25,
                backgroundColor:theme.theme.primaryBackground,
            },
            buttonsHolder:{
                width:'90%',
                borderWidth:2,
                backgroundColor:theme.theme.primaryBackground,
                borderColor:theme.theme.secondaryText,
                flexDirection:'row',
                justifyContent:'space-between',
                padding:8,
                borderRadius:50,
            },
            buttonCover:{
                overflow:'hidden',
                borderRadius:50
            },
            button:{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:25,
                paddingVertical:8,
                borderRadius:50,
            },
            buttonIconContainer:{
                marginRight:10,
                borderRadius:5
            },
            buttonIcon:{
                color:theme.theme.secondaryText
            },
            buttonText:{
                color:theme.theme.secondaryText,
                fontSize:20,
            },
            activeButtonCover:{
                elevation:5
            },
            activeButton:{
                backgroundColor:theme.theme.secondaryBackground
            },
            activeButtonIcon:{
                color:theme.theme.activeColor
            },
            activeButtonText:{
                color:theme.theme.activeColor
            },
            formContainer:{
                flex:1,
            }
        })
    )
}

export const AddTransactionPage = ({closeModal,transactionTyppe})=>{
    const [transactionType,setTransactionType] = useState(transactionTyppe)
    const [showCategoryList,setShowCategoryList] = useState(false)
    const [showErrorBox,setShowErrorBox] = useState(false)
    const [errMessage,setErrMessage] = useState('')
    const [formData,setFormData] = useState({
        date:'',
        amount:'',
        category:'',
        particular:'',
        miscellaneous:''
    })

    const styles = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    const handleChangeTransactionType = (type)=>{
        setTransactionType(type)
    }

    const handleOpenCategoryList = ()=>{
        setShowCategoryList(true)
    }

    const handleCloseCategoryList = ()=>{
        setShowCategoryList(false)
    }

    const handleCloseErrorBox = ()=>{
        setShowErrorBox(false)
    }

    const handleOpenErrorBox = ()=>{
        setShowErrorBox(true)
    }

    const onInputChangeHandler = (value,data_type)=>{
        const updatedData = {...formData}
        updatedData[data_type] = value;
        setFormData(updatedData)

        if(data_type==='category'){
            handleCloseCategoryList()
        }
    }

    const handleOnSaveClick = ()=>{
        const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/
        
        if(!formData.date.match(dateFormat)){
            setErrMessage('Please enter a valid date.')
            handleOpenErrorBox()
            return
        }

        if(formData.category===''&&transactionType==='Expense'){
            setErrMessage('Please select a category.')
            handleOpenErrorBox()
            return
        }

        const currDate = new Date()
        const timeStamp = currDate.getTime()
        if(transactionType==='Expense'){
            const amount = parseInt(formData.amount)
            const data = {
                id:timeStamp.toString(),
                amount : amount,
                category : formData.category,
                date : formData.date,
                particular : formData.particular
            }
            dispatch(addExpenseTransaction(data))
        }else{
            const amount = parseInt(formData.amount)
            const data = {
                id : timeStamp.toString(),
                amount : amount,
                date : formData.date,
                particular : formData.miscellaneous,
                category:'Income'
            }
            dispatch(addIncomeTransaction(data))
        }
        closeModal()
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonContainer}>
                    <TouchableNativeFeedback
                        onPress={closeModal}
                    >
                        <View style={styles.backButton}>
                            <AntDesign name="left" size={22} color={theme.theme.primaryText}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.headerLabelContainer}>
                    <Text style={styles.headerLabel}>Add Transaction</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsHolder}>
                    <View style={{...styles.buttonCover,...transactionType==='Expense'?styles.activeButtonCover:{}}}>
                        <TouchableNativeFeedback
                            onPress={()=>{handleChangeTransactionType('Expense')}}
                        > 
                            <View style={{...styles.button,...transactionType==='Expense'?styles.activeButton:{}}}>
                                <View style={{...styles.buttonIconContainer}}>
                                    <AntDesign name="upcircleo" size={20} style={{...styles.buttonIcon,...transactionType==='Expense'?styles.activeButtonIcon:{}}}/>
                                </View>
                                <Text style={{...styles.buttonText,...transactionType==='Expense'?styles.activeButtonText:{}}}>Expense</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{...styles.buttonCover,...transactionType==='Income'?styles.activeButtonCover:{}}}>
                        <TouchableNativeFeedback
                            onPress={()=>{handleChangeTransactionType('Income')}}
                        >
                            <View style={{...styles.button,...transactionType==='Income'?styles.activeButton:{}}}>
                                <View style={styles.buttonIconContainer}>
                                    <AntDesign name="downcircleo" size={20} style={{...styles.buttonIcon,...transactionType==='Income'?styles.activeButtonIcon:{}}}/>
                                </View>
                                <Text style={{...styles.buttonText,...transactionType==='Income'?styles.activeButtonText:{}}}>Income</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
            <View style={styles.formContainer}>
                {
                    transactionType==='Expense'
                    ?<ExpenseTransactionForm
                        formData={formData}
                        onInputChangeHandler={onInputChangeHandler}
                        closeModal={closeModal}
                        openCategoryList={handleOpenCategoryList}
                        transactionType={transactionType}
                        saveTransaction={handleOnSaveClick}
                    />
                    :<ExpenseTransactionForm
                        formData={formData}
                        onInputChangeHandler={onInputChangeHandler}
                        closeModal={closeModal}
                        openCategoryList={handleOpenCategoryList}
                        transactionType={transactionType}
                        saveTransaction={handleOnSaveClick}
                    />
                }
            </View>
            {
                showCategoryList&&
                <CategoryListDropDown
                    onSelect = {onInputChangeHandler}
                    closeCategoryList={handleCloseCategoryList}
                />
            }
            {
                showErrorBox&&
                <ErrorBox 
                    closeDialogBox={handleCloseErrorBox}
                    message={errMessage}
                />
            }
        </View>
    )
}