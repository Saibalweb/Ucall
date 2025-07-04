import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CallScreen from './src/Screens/CallScreen'
import IncomingCall from './src/Screens/IncomingCall'
import OutgoingCall from './src/Screens/OutgoingCall'
import HomeScreen from './src/Screens/HomeScreen'
import { Navigation } from './Navigation'
import { SocketProvider } from './src/Providers/Socket'
import { PeerProvider } from './src/Providers/Peer'

const App = () => {
  return (
    <SocketProvider>
      <PeerProvider>
        <Navigation/>
      </PeerProvider>
    </SocketProvider>
  )
}

export default App

const styles = StyleSheet.create({})