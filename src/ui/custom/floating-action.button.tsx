import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Plus } from 'lucide-react-native'
import { COLORS } from '../utils/color.ui'


type PramType = {
    onPress:() => void
}

const FAB:React.FC<PramType> = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.Button} 
        >
        <Plus color={COLORS.white} size={30}/>
    </TouchableOpacity>
  )
}

export default FAB

const styles = StyleSheet.create({
    Button:{
        position:'absolute',
        backgroundColor:COLORS.Bright_Royal_Blue,
        bottom:25,
        right:20,
        zIndex:1,
        height:60,
        width:60,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        elevation:4
    }
})