import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeTabParamList } from '../../types/home-root.type'
import HomeScreen from '../component/home/home-screen'
import {Tags, CarFront, UserRoundCheck, Banknote, ChartColumn} from 'lucide-react-native'
import { COLORS } from '../utils/color.ui'
import { fonts } from '../utils/fonts'

const BottomTab = createBottomTabNavigator<HomeTabParamList>()

export default function HomeRoot() {
  return (
    <BottomTab.Navigator
        screenOptions={({route}) => ({
            headerShown:false,
            tabBarActiveTintColor:COLORS.Bright_Royal_Blue,
            tabBarInactiveTintColor:COLORS.black_lite_v2,
            tabBarStyle:styles.tabBarStyle,
            tabBarItemStyle:styles.tabBarItemStyle,
            tabBarHideOnKeyboard:true,
            tabBarLabelStyle:styles.tabBarLabelStyle,
            tabBarIcon:({color, size, focused}) =>{
                switch(route.name){
                    case 'home':
                        return <ChartColumn color={color} size={size}/>
                    case 'car':
                        return <CarFront color={color} size={size}/>
                    case 'seller':
                        return <Tags color={color} size={size}/>
                    case 'lead':
                        return <UserRoundCheck color={color} size={size}/>
                    case 'finance':
                        return <Banknote color={color} size={size}/>
                }
            }
        })}
        >
            {/* home screen */}
        <BottomTab.Screen 
            name='home' 
            options={{
                title:'Accueil'
            }}
            component={HomeScreen}/>

            {/* car details screen  */}
        <BottomTab.Screen 
            name='car' 
            options={{
                title:'Voiture'
            }}
            component={HomeScreen}/>


            {/* seller details screen */}
        <BottomTab.Screen 
            name='seller' 
            options={{
                title:'Vendeur'
            }}
            component={HomeScreen}/>

            {/* lead screen details  */}
        <BottomTab.Screen 
            name='lead' 
            options={{
                title:"Lead"
            }}
            component={HomeScreen}/>

            {/* finance details screen */}
        <BottomTab.Screen 
            name='finance' 
            options={{
                title:'Finance'
            }}
            component={HomeScreen}/>
    </BottomTab.Navigator>
  )
}

// style 
const styles = StyleSheet.create({
    tabBarStyle:{
        height:87,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderTopColor:COLORS.Bright_Royal_Blue,
        borderTopWidth:5,
        borderRightWidth:2,
        borderLeftWidth:2,
    },
    tabBarItemStyle:{
        paddingVertical:15,
    },
    tabBarLabelStyle:{
        fontFamily:fonts.medium,
        fontSize:12,
    }
})