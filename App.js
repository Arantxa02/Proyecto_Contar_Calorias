import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import Routes from './src/Routes/Routes'


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