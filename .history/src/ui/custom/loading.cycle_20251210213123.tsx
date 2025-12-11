import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type paramList = {
  isLoadingCycle:true
}

const LoadingCycle:React.FC<paramList> = ({isLoadingCycle}) => {
  if(!isLoadingCycle) return;
  if()
  return (
    <View>
      <Text>LoadingCycle</Text>
    </View>
  )
}

export default LoadingCycle

const styles = StyleSheet.create({})