import React from 'react'

import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'

import {Layout} from "./components/layout/layout"
import {ThemeManager} from './components/ui/themeManager/themeManager'
import UserInfoReducer from './store/reducers/userInfoReducer'
import TransactionDataReducer from './store/reducers/transactionDataReducer'

const RootReducer = combineReducers({
  user:UserInfoReducer,
  transaction:TransactionDataReducer
})

const store = createStore(RootReducer)


const App = ()=>{
  return(
    <Provider store={store}>
      <ThemeManager>
        <Layout/>
        </ThemeManager>
    </Provider>
  )
}

export default App