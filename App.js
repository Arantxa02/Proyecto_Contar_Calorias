import {  View } from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

import Routes from './src/Routes/Routes'


 function App(){
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      <Routes/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;