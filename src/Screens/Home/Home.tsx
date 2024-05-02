import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import TodayMeals from '../../components/TodayMeals/TodayMeals';
import TodayCalories from '../../components/TodayCalories/TodayCalories';
import Header from '../../components/Header/Header';
import useFoodStorage from '../../hooks/useFoodStorage';
import { useCallback, useState } from 'react';
import { Meal } from '../../types';

const totalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);
  const [todayStatistics, setTodayStatistics] = useState({
    ingeridas: 0,
    porcentage: 0,
    restantes: 0,
    total: totalCaloriesPerDay,
  });

  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation();

  const calculatedTodayStatistics = (meals: Meal[]) => {
    try {
      const calorisConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calorias),
        0
      );
      const remainingCalories = 2000 - calorisConsumed;
      const porcentage = (calorisConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        ingeridas: calorisConsumed,
        porcentage,
        restantes: remainingCalories,
        total: totalCaloriesPerDay,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      calculatedTodayStatistics(todayFoodResponse);
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
      <TouchableOpacity
        style={styles.caloriasButton}
        onPress={handleAddCaloriesPress}>
        <Text style={styles.caloriasText}>Calorías</Text>
        <View style={styles.buttonIconContainer}>
          <Icon name="add-circle" size={32} color="black" />
        </View>
      </TouchableOpacity>
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={todayFood}
        onCompleteAddRemove={() => loadTodayFood()}
      />
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
    backgroundColor: '#ad5cff',
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