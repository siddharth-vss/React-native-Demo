import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from './services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleRegister = () => {
    Alert.alert('Register', 'Navigate to Register Page');
    navigation.navigate('Register');
    
  };
  
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Navigate to Forgot Password Page');
  };
  
  const handleSubmit = async () => {
    // Basic validation
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      const data = await login(username, password)
      console.log('hi', data.data.access_token);
      
      await AsyncStorage.setItem(
        'Token',
        data.data.access_token,
      );
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />



      {/* <View style={[styles.reg]}>
        <Text>Don't Have Account ?
          <TouchableOpacity style={{alignItems:"center"}} onPress={handleSubmit}>
            <Text  >Submit</Text>
          </TouchableOpacity>
        </Text>

        <TouchableOpacity onPress={handleSubmit}>
          <Text >Forgot Password?</Text>
        </TouchableOpacity>
      </View> */}



      <View style={[styles.reg]} >

        <TouchableOpacity style={styles.linkButton} onPress={handleRegister}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>

        {/* Forgot Password Button */}
        <TouchableOpacity style={styles.linkButton} onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#0066cc',
    fontSize: 16,
  },
});

export default Login;
