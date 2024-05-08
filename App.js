import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import Routes from './src/Routes/Routes'

const firebaseConfig = {
  apiKey: "AIzaSyDamS2W40PAkbATh5qaFwtC-9AQ6Mu2w9Y",
  authDomain: "proyectofinal-9aba1.firebaseapp.com",
  projectId: "proyectofinal-9aba1",
  storageBucket: "proyectofinal-9aba1.appspot.com",
  messagingSenderId: "653838449776",
  appId: "1:653838449776:web:343536f913e26888e508b5",
};

const app = initializeApp(firebaseConfig);

// Inicialización de Firebase Auth con AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
})

export default App;