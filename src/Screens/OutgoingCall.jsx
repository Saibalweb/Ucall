import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const OutgoingCall = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 200,
      }}>
      <Text style={{fontSize: 30, color: 'white'}}>Calling to 18238...</Text>
      <TouchableOpacity style={styles.controlButton}>
        <Icon name="call" size={44} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OutgoingCall;

const styles = StyleSheet.create({
    controlButton: {
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
