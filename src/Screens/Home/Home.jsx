import { Text, SafeAreaView, StyleSheet,View} from 'react-native';
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header/Header.jsx';

const Home = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
    <Header/>
      <View style={styles.caloriasContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.caloriasText}>Calorías</Text>
            </View>
            <View style={styles.rightContainer}>
            <Button icon={<Icon name="add-circle" />} 
                radius="lg"
                color="#9933FF"
               onPress={ () => navigation.navigate('AddFood')}
                />
      </View>
        
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  caloriasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 150,
  },
  caloriasText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  rightContainer: {
    flex: 0,
    width: 60,
    height: 60,
    padding:12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Home;