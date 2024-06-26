import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { GlobalStyles } from '../../constants/styles'

const ErrorOverlay = ({message, pressHandler}: {message: string, pressHandler:() => void }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={pressHandler}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})