import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/color.ui'

type paramList = {
  isLoadingCycle:true
}

const LoadingCycle:React.FC<paramList> = ({isLoadingCycle}) => {
  if(!isLoadingCycle) return;

  return (
    <View style={styles.container}>
       <ActivityIndicator size={'large'} color={COLORS.Bright_Royal_Blue}/>
    </View>
  )
}

export default LoadingCycle

const styles = StyleSheet.create({
  container:{
   
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:3300
  }
})