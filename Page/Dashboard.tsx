import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const [dp, setdp] = useState(false);
    const [token, settoken] = useState('');
  
  
  
  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('Token');
      settoken(value ?? 'no token');
      setdp(true)
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    };
  
    
    return () => {
      getData();
    };
  }, [dp,token]);
  return (
    <View>
      <Text>{token}</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})