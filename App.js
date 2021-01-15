import React,{useEffect} from 'react'

import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import {openDatabase} from 'react-native-sqlite-storage'

import {Layout} from "./components/layout/layout"
import {ThemeManager} from './components/ui/themeManager/themeManager'
import UserInfoReducer from './store/reducers/userInfoReducer'
import TransactionDataReducer from './store/reducers/transactionDataReducer'

const RootReducer = combineReducers({
  user:UserInfoReducer,
  transaction:TransactionDataReducer
})

const store = createStore(RootReducer)

const db = openDatabase({name:'ExpenseTracker.db',location:'Documents'})

const App = ()=>{
  useEffect(()=>{
    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS user(id string primary key, name string, theme string)');
    })
    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS transactions(id string primary key, category string, amount int, date string, particular string)')
    })
  },[db])

  return(
    <Provider store={store}>
      <ThemeManager>
        <Layout/>
        </ThemeManager>
    </Provider>
  )
}

export default App