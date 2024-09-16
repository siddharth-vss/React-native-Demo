// import React, { useState, useRef, useEffect } from 'react';
// import { View, Button, StyleSheet, Text, Alert } from 'react-native';
// import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, MediaStream, RTCView } from 'react-native-webrtc';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000/');

// const App = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const localStreamRef = useRef();
//   const remoteStreamRef = useRef();

//   useEffect(() => {
//     const setupWebRTC = async () => {
//       // const stream = await getUserMedia();
//       // setLocalStream(stream);
//       // localStreamRef.current.srcObject = stream;

//       // const pc = new RTCPeerConnection();
//       // setPeerConnection(pc);

//       // pc.onicecandidate = (event) => {
//       //   if (event.candidate) {
//       //     socket.emit('ice-candidate', event.candidate);
//       //   }
//       // };

//       // pc.ontrack = (event) => {
//       //   setRemoteStream(event.streams[0]);
//       //   remoteStreamRef.current.srcObject = event.streams[0];
//       // };

//       // socket.on('offer', async (offer) => {
//       //   await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       //   const answer = await pc.createAnswer();
//       //   await pc.setLocalDescription(answer);
//       //   socket.emit('answer', answer);
//       // });

//       // socket.on('answer', async (answer) => {
//       //   await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       // });
//       console.log(socket)

//       // socket.on('ice-candidate', async (candidate) => {
//       //   await pc.addIceCandidate(new RTCIceCandidate(candidate));
//       // });
//       socket.emit('message', 'Hello World');
//       Alert.alert('hii','fine');

//       socket.on('broadcast', (data) => {
//         Alert.alert(data.message);
//       });
//     };

//     setupWebRTC();

//     // return () => {
//       // if (localStream) localStream.release();
//       // if (peerConnection) peerConnection.close();
//     // };

//   // }, [localStream]);

//   });

//   // const getUserMedia = async () => {
//   //   const stream = await navigator.mediaDevices.getUserMedia({
//   //     video: true,
//   //     audio: true
//   //   });
//   //   return stream;
//   // };

//   // const startCall = async () => {
//   //   const offer = await peerConnection?.createOffer();
//   //   await peerConnection?.setLocalDescription(offer);
//   //   socket.emit('offer', offer);
//   // };

//   return (
//     <View>
//       <Text>Hello</Text>

//     </View>
//     // <View style={styles.container}>
//     //   <Text>Local Stream</Text>
//     //   <View style={styles.streamContainer}>
//     //     <RTCView
//     //       streamURL={localStream ? localStream.toURL() : ''}
//     //       style={styles.stream}
//     //       ref={localStreamRef}
//     //     />
//     //   </View>
//     //   <Text>Remote Stream</Text>
//     //   <View style={styles.streamContainer}>
//     //     <RTCView
//     //       streamURL={remoteStream ? remoteStream.toURL() : ''}
//     //       style={styles.stream}
//     //       ref={remoteStreamRef}
//     //     />
//     //   </View>
//     //   <Button title="Start Call" onPress={startCall} />
//     // </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   streamContainer: {
//     width: '100%',
//     height: '50%',
//     backgroundColor: 'black'
//   },
//   stream: {
//     width: '100%',
//     height: '100%'
//   }
// });

// export default App;


import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://192.168.0.120:3000'; // or your server URL

const App = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io(SOCKET_SERVER_URL);
    newSocket.emit("broadcast","HELLO WOLRD");
    // Listen for "message" event from server
    newSocket.on('broadcast', (msg: string) => {
      setMessage(msg);
    });

    // Save the socket instance
    setSocket(newSocket);

    // Clean up the connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>Message from server: {message}</Text>
    </View>
  );
};

export default App;
