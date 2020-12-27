import React from 'react'

import {Layout} from "./components/layout/layout"
import {ThemeManager} from './ui/themeManager/themeManager'

const App = ()=>{
  return(
    <ThemeManager>
      <Layout/>
    </ThemeManager>
  )
}

export default App