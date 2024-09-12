
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  PermissionsAndroid
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';



const Dashboard = () => {

  // const { hasPermission, requestPermission } = useMicrophonePermission()
  // const { hasPermission, requestPermission } = useCameraPermission()

  // const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()
  // const device = devices.back;

  const camera = useRef<Camera>(null)
  const [dp, setdp] = useState(false);
  const [token, settoken] = useState('');


  const capture =  async()=>{

    const photo = await camera?.current?.takePhoto({
      flash: 'on' // 'auto' | 'off'
    })

    console.log(photo);
  
  }

  useEffect(() => {
    const getPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      if (!hasPermission) return requestCameraPermission()
      if (device == null) return Alert.alert('Permission denied', 'Camera permission is required to use this feature.');

    };
    getPermissions();
  }, []);

  if (!device) {
    return <Text>Loading...</Text>;
  }


  // requestCameraPermission();

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
  }, [dp, token]);
  return (
    <View style={styles.container}>
      {hasPermission ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      ) : (
        <View style={styles.permissionDenied}>
          <Text>No access to the camera</Text>
        </View>
      )}

      <TouchableOpacity onPress={capture} style={styles.captureButton}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#ff4081',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};