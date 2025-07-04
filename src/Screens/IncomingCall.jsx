import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const IncomingCall = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black',justifyContent:'space-between',alignItems:'center',paddingVertical:200}}>
        <Text style={{fontSize:30, color:'white'}}>012394 is Calling...</Text>
      <TouchableOpacity style={styles.controlButton}>
        <Icon name="call" size={44} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IncomingCall;

const styles = StyleSheet.create({
    controlButton: {
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
