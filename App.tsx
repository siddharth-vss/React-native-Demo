import { Image, StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from './components/Onboarding'
import { Login, Register ,Dashboard, GPT } from './Page';

const Stack = createNativeStackNavigator();

const App = () => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Splash screen will disappear after 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#000000" }]}>

        <Image source={require('./assets/img.png')} style={[styles.image, { resizeMode: 'center' }]} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
        <Stack.Screen name="GPT" options={{ headerShown: false }} component={GPT} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const Home = ({navigation }: {navigation : NavigationProp<any>}) => {
  return (
    <View style={styles.container}>


      <Onboarding navigation={navigation} />
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    height: 200,
    width: 200,
    resizeMode: 'contain',
    backgroundColor: '#000000',
    // opacity: 0.8,
    position: 'absolute',
    borderRadius: 10000,
    justifyContent: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

})