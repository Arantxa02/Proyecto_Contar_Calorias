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

const totalCaloriesPerDay = 2000;   //Definición del total de calorias por dia 

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);  //Estado para almacenar la comida de hoy
  const [todayStatistics, setTodayStatistics] = useState({ //Estado para almacenar estadísticas de hoy
    ingeridas: 0,
    porcentage: 0,
    restantes: 0,
    total: totalCaloriesPerDay,
  });

  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation();


//Función para calcular las estadisticas de hoy en base a las comidas
const calculatedTodayStatistics = (meals: Meal[]) => {
  try {
    if (meals && meals.length > 0) {
      const calorisConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calorias),
        0
      );
      const remainingCalories = totalCaloriesPerDay - calorisConsumed;
      const porcentage = (calorisConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        ingeridas: calorisConsumed,
        porcentage,
        restantes: remainingCalories,
        total: totalCaloriesPerDay,
      });
    } else {
      // Si no hay comidas para el día o si meals es undefined, reinicia las estadísticas
      setTodayStatistics({
        ingeridas: 0,
        porcentage: 0,
        restantes: totalCaloriesPerDay,
        total: totalCaloriesPerDay,
      });
    }
  } catch (error) {
    console.error(error);
  }
};


//Carga las comidas de hoy al pulsar en el componente
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

  //Usa el hook useFocusEffect para cargar las comidas de hoy cuando el componente está enfocado
  useFocusEffect(useCallback(() => {
    loadTodayFood().catch(null);
  }, [loadTodayFood]));

//Manejador de eventos para añadir las calorias
  const handleAddCaloriesPress = () => {
    navigate('AddFood');   //Navega a la pantalla AddFood para agregar comida
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
        foods={todayFood}   //Pasa las comidas de hoy al componente TodayMeals
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