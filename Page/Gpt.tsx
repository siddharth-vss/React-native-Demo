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

import Entypo from 'react-native-vector-icons/Entypo'
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';
import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import { io, Socket } from "socket.io-client";
import Video from 'react-native-video';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';


const GPT = () => {


  const [cam, setcam] = useState(true)

  // const { hasPermissionM, requestPermissionM } = useMicrophonePermission()
  // const { hasPermissionC, requestPermissionC } = useCameraPermission()

  // const [hasPermission, setHasPermission] = useState(false);
  // const device = useCameraDevice('back')
  const device = useCameraDevice(cam ? 'front' : 'back');
  const { hasPermission } = useCameraPermission()
  // const device = devices.back;

  const camera = useRef<Camera>(null)
  const [dp, setdp] = useState(false);
  const [token, settoken] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const pcRef = useRef<RTCPeerConnection>();





  const capture = async () => {


    const offer = await pcRef.current?.createOffer({});
    await pcRef.current?.setLocalDescription(offer);
    socket?.emit('offer', offer);
  }

  useEffect(() => {
    const getPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      if (!hasPermission) return requestCameraPermission()
      if (device == null) return Alert.alert('Permission denied', 'Camera permission is required to use this feature.');
      // console.log("C",hasPermissionC,"M",hasPermissionM);
    };
    getPermissions();
  }, []);

  if (!device) {
    return <Text>Loading...</Text>;
  }


  // requestCameraPermission();

  useEffect(() => {
    // console.log(device)

    const getData = async () => {
      const value = await AsyncStorage.getItem('Token');
      settoken(value ?? 'no token');
      setdp(true)
      if (value !== null) {
        // We have data!!
        const socket = io("http://192.168.0.120:3000", {
          reconnectionDelayMax: 10000,
          // auth: { token: token },

        });

        // console.log(camera);
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
        socket.emit("broadcast","HELLO WOLRD");
        socket.emit('broadcast',device);
        socket.on('broadcast',(data)=>{
          console.log(data);
          Alert.alert(data);
        })

          // socket.emit();
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
  });
  return (
    <View style={styles.container}>
      {hasPermission ? (<>
        <Camera
          style={StyleSheet.absoluteFillObject}
          device={device}
          isActive={true}
        />
        <TouchableOpacity onPress={() => setcam(!cam)} style={[styles.captureButton, { top: 50, height: 40, right: 0, alignContent: 'center', backgroundColor: 'transparent', justifyContent: "center" }]}>
          <Entypo name="cycle" color="white" size={20} />
        </TouchableOpacity>
      </>
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

export default GPT

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
  video: {
    position: "absolute",
    width: 300,
    height: 300,
    flex: 0.5,
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


// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://192.168.0.120:3000'; // or your server URL

// const App = () => {
//   const [message, setMessage] = useState<string | null>(null);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const newSocket = io(SOCKET_SERVER_URL);
//     newSocket.emit("broadcast","HELLO WOLRD");
//     // Listen for "message" event from server
//     newSocket.on('broadcast', (msg: string) => {
//       setMessage(msg);
//     });

//     // Save the socket instance
//     setSocket(newSocket);

//     // Clean up the connection on component unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Message from server: {message}</Text>
//     </View>
//   );
// };

// export default App;
