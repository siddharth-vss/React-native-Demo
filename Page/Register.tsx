import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register  = ({navigation }: {navigation : NavigationProp<any>}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = () => {
    Alert.alert('Login', 'Navigate to Login Page');
    navigation.navigate('Login');

  };


  const handleSubmit = () => {
    // Basic validation
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      Alert.alert('Success', `Welcome, ${name}!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
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

        <TouchableOpacity style={styles.linkButton} onPress={handleLogin}>
          <Text style={styles.linkText}>Login</Text>
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

export default Register;
