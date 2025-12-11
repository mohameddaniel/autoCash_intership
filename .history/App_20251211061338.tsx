import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import StackRoot from './src/ui/routes/stack.root'
import { Provider } from 'react-redux'
import { store } from './src/store/redux/store/redux.store'
import ToastManager from 'toastify-react-native'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ToastManager/>
        <StackRoot />
      </NavigationContainer>
    </Provider>
  )
}

export default App
