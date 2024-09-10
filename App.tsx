import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'

import Onboarding from './components/Onboarding'
const App = () => {
  return (
    <View style={styles.container}>
     
      <Onboarding />
      <StatusBar />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

})