import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddCarScreen from '../component/new_cars/add.car'
import HomeRoot from './home-route'
import { fonts } from '../utils/fonts'
import { COLORS } from '../utils/color.ui'
import { Bell, CircleEllipsis } from 'lucide-react-native'


export type StackParamList = {
    TabMain:undefined
    addCar:undefined
}

const Stack = createStackNavigator<StackParamList>()

const StackRoot = () => {
  return (
    <Stack.Navigator 
        initialRouteName='TabMain'
        screenOptions={{
            headerShown:false
        }}>
        <Stack.Screen 
            name='addCar'
            options={{
                headerShown:true,
                title:'Ajouter une voiture',
                presentation:'modal',
                headerTitleStyle:styles.headerTitleStyle,
                headerRight:() => (
                    <View style={styles.headerContainer}>
                       <Bell size={22} color={COLORS.black_lite_v2}/>
                       <CircleEllipsis size={22} color={COLORS.black_lite_v2}/>
                    </View>
                )
            }}
            component={AddCarScreen}
            />
        
        <Stack.Screen 
            name='TabMain'
            component={HomeRoot}
        />
    </Stack.Navigator>
  )
}

export default StackRoot

const styles = StyleSheet.create({
    headerTitleStyle :{
        fontSize:18,
        fontFamily:fonts.medium,
        color:COLORS.black_lite,
    },
    headerContainer:{
        flexDirection:'row',
        paddingHorizontal:15,
        gap:15
    }
})