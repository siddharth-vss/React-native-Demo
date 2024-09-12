import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RTCPeerConnection, mediaDevices, RTCView, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import io from 'socket.io-client';

export default function App() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    const socket = io('https://chatboat.koyeb.app');

function startCall() {
  peerConnection.current.createOffer({}).then(offer => {
    peerConnection.current.setLocalDescription(offer);
    socket.emit('offer', offer);
  });

  socket.on('offer', offer => {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.current.createAnswer().then(answer => {
      peerConnection.current.setLocalDescription(answer);
      socket.emit('answer', answer);
    });
  });

  socket.on('answer', answer => {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
  });

  socket.on('candidate', candidate => {
    peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
  });

  peerConnection.current.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('candidate', event.candidate);
    }
  };
}
    // Get the media devices for video
    mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then(stream => {
      setLocalStream(stream);
      peerConnection.current.addStream(stream);
    });

    // Handle receiving remote stream
    peerConnection.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    // Clean up the stream
    return () => {
      localStream && localStream.release();
      peerConnection.current && peerConnection.current.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      {localStream && <RTCView streamURL={localStream.toURL()} style={styles.video} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.video} />}
      <Button title="Start Call" onPress={startCall} />
      <Button title="End Call" onPress={endCall} />
    </View>
  );

  function startCall() {
    // Implement WebRTC signaling here (send offer/answer via signaling server)
  }

  function endCall() {
    peerConnection.current.close();
    setRemoteStream(null);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
  },
});


