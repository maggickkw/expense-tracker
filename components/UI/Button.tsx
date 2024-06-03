import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Button = ({children, onPress, mode, style}: {children: React.ReactNode, onPress: () => void, mode?: 'flat'| 'default', style?: ViewStyle}) => {
  return (
    <View style={style}>
   <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, mode === 'flat' && styles.flat]}>
        <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
    </View>
   </TouchableOpacity>
   </View>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    }
})