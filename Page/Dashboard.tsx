
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
import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import { io, Socket } from "socket.io-client";
import Video from 'react-native-video';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';


const Dashboard = () => {

  

 
  // const { hasPermission, requestPermission } = useMicrophonePermission()
  // const { hasPermission, requestPermission } = useCameraPermission()

  // const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('front')
  const { hasPermission } = useCameraPermission()
  // const device = devices.back;

  const camera = useRef<Camera>(null)
  const [dp, setdp] = useState(false);
  const [token, settoken] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const pcRef = useRef<RTCPeerConnection>();



 

const capture =  async()=>{
 

  const offer = await pcRef.current?.createOffer({});
  await pcRef.current?.setLocalDescription(offer);
  socket?.emit('offer', offer);
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
        const socket = io("https://chatboat.koyeb.app", {
          reconnectionDelayMax: 10000,
          auth: {token : token},

        });

        console.log(socket,'l',value)
        setSocket(socket);
        
        pcRef.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
    
        // pcRef.current.onicecandidate = (event : any) => {
        //   if (event.candidate) {
        //     socket.emit('ice-candidate', event.candidate);
        //   }
        // };
    
        // pcRef.current.ontrack = (event : any) => {
        //   setRemoteStream(event.streams[0]);
        // };
    
        socket.on('offer', async (data) => {
          await pcRef.current?.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await pcRef.current?.createAnswer();
          await pcRef.current?.setLocalDescription(answer);
          socket.emit('answer', answer);
          console.log('socket offer fronted', answer)
        });
    
        socket.on('answer', async (data) => {
          await pcRef.current?.setRemoteDescription(new RTCSessionDescription(data));
        });
    
        socket.on('ice-candidate', async (data) => {
          try {
            await pcRef.current?.addIceCandidate(new RTCIceCandidate(data));
          } catch (e) {
            console.error('Error adding received ice candidate', e);
          }
        });
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
          style={StyleSheet.absoluteFillObject}
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
  video:{
    position:"absolute",
    width: 300,
    height: 300,
    flex : 0.5,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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