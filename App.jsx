import { StyleSheet } from 'react-native'
import React from 'react'
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