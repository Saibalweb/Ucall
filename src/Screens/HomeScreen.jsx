
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSocket } from '../Providers/Socket';
export default function HomeScreen() {
    const socket = useSocket();
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [roomId, setRoomId] = React.useState("");
    const handleRoomJoin = ()=>{
        if(!email || !roomId){
            alert("Please enter all the fields");
            return;
        }
        socket.emit("join-room", {roomId, emailId: email});
    }
    const handleRoomJoined = useCallback((room)=>{
        navigation.navigate("CallScreen",{
            roomId:room.roomId
        });
    },[navigation])
    useEffect(()=>{
      socket.on('joined-room',handleRoomJoined);
      return ()=>{
        socket.off('joined-room',handleRoomJoined)
      }
    },[socket,handleRoomJoined])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.content}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Your email Id</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(t)=>setEmail(t)}
            placeholderTextColor="#666"
            selectionColor="#5D5FEF"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Your RoomId</Text>
          <TextInput
            style={styles.input}
            value={roomId}
            onChangeText={(t)=>setRoomId(t)}
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="#666"
            selectionColor="#5D5FEF"
          />
        </View>
        
        {/* Call Button */}
        <TouchableOpacity style={styles.callButton} onPress={handleRoomJoin}>
          <Text style={styles.callButtonText}>Join Room</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  callerIdContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  labelText: {
    color: '#999',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  callerIdText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    color: '#FFF',
    fontSize: 16,
    padding: 12,
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#5D5FEF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});