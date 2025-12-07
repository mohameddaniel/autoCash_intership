
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import StackRoot from './src/ui/routes/stack.root'

const App = () => {
  return (
    <NavigationContainer>
      <StackRoot/>
    </NavigationContainer>
  )
}

export default App
