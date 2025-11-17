import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSocket} from '../Providers/Socket';
import {usePeer} from '../Providers/Peer';
import {mediaDevices, RTCPeerConnection, RTCView} from 'react-native-webrtc';
import { useNavigation } from '@react-navigation/native';

export default function CallScreen() {
  const socket = useSocket();
  const navigation = useNavigation();
  const {peer, createOffer, createAnswer, setRemoteAns,sendStream} = usePeer();

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);


  const startLocalStream = useCallback(async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: 'user',
      },
    });

   sendStream(stream);

    setLocalStream(stream);
  }, [peer]);

const endCall = () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  if (peer) {
    peer.close();
  }
    socket.off('user-joined');
    socket.off('incoming-call');
    socket.off('call-accepted');

  navigation.goBack(); 
};

const toggleMute = () => {
  if (!localStream) return;

  localStream.getAudioTracks().forEach(track => {
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled); 
  });
};

  const handleNewUserJoined = useCallback(
    async data => {
      console.log('New user joined:', data);
      const {emailId} = data;
      const offer = await createOffer();
      socket.emit('call-user', {emailId, offer});
    },
    [createOffer, socket],
  );

  const handleIncomingCall = useCallback(
    async data => {
      const {from, offer} = data;
      const answer = await createAnswer(offer);
      socket.emit('call-accepted', {emailId: from, ans: answer});
    },
    [createAnswer, socket],
  );

  const handleCallAccepted = useCallback(
    async data => {
      const {ans} = data;
      await setRemoteAns(ans);
      console.log('Call accepted.');
      const pc = new RTCPeerConnection(configuration);
      console.log(pc.connectionState);
    },
    [setRemoteAns],
  );

  useEffect(() => {
    startLocalStream();

    peer.ontrack = event => {
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    socket.on('user-joined', handleNewUserJoined);
    socket.on('incoming-call', handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);

    return () => {
      socket.off('user-joined', handleNewUserJoined);
      socket.off('incoming-call', handleIncomingCall);
      socket.off('call-accepted', handleCallAccepted);

      peer.close();
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [
    socket,
    peer,
    handleNewUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    startLocalStream,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Remote video */}
      <View style={styles.mainVideo}>
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        )}
      </View>

      {/* Local video (picture-in-picture) */}
      <View style={styles.pipContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.pipVideo}
            objectFit="cover"
          />
        )}
      </View>

      {/* Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="volume-high" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="camera" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcon name="more-horiz" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.muteButton]}
          onPress={()=>console.log('this')}>
          <Icon name="call" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
          <FontAwesomeIcon
            name={isMuted ? 'microphone-slash' : 'microphone'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainVideo: {
    flex: 1,
    backgroundColor: 'black',
  },
  remoteVideo: {
    flex: 1,
  },
  pipContainer: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    borderRadius: 10,
    height: 200,
    width: 120,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 10,
  },
  pipVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  topControls: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    zIndex: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  bottomControls: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: '#FF3B30',
  },
});
