import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import TodayCalories from '../../components/TodayCalories/TodayCalories';
import Header from '../../components/Header/Header';
import useFoodStorage from '../../hooks/useFoodStorage';
import { useCallback, useState } from 'react';

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation();

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadTodayFood().catch(null);
  }, [loadTodayFood]));


  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity style={styles.caloriasButton} onPress={handleAddCaloriesPress}>
       <Text style={styles.caloriasText}>Calorías</Text>
        <View style={styles.buttonIconContainer}>
          <Icon name="add-circle" size={32} color="black" />
        </View>
      </TouchableOpacity>
      <TodayCalories total={''} consumidas={''} restantes={''} porcentage={0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
  },
  caloriasButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 125,
    backgroundColor: "#ad5cff",
    borderRadius: 30,    
  },
  caloriasText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    flex: 1,
  },
  buttonIconContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;