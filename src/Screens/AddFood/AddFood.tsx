import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { useState } from 'react';


import Header from '../../components/Header/Header';
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import MealItem from '../../components/MealItem/MealItem';
import { Meal } from '../../types/index';

const AddFood = () => {
  const [visible, setIsVisible] = useState(false);   //Estado para controlar la visibilidad del modal
  const [foods, setFoods] = useState([]);  //Estado para almacenar la comida
  const { onGetFood } = useFoodStorage();  //hook personalizado para obtener las comidas
  const [search, setSearch] = useState('');  //Estado para almacenar el texto de busqueda


  //Función para cargar las comidas
  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  //Controlador para cerrar el modal
  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      loadFoods();
    }
    setIsVisible(false);
  };

//Controlador para realizar la busqueda
  const handleSearchPress = async () => {
    if (!search) {
    Alert.alert('Error', 'Por favor, introduce texto en el campo de búsqueda.');
      return;
    }
  
    try {
      const result = await onGetFood();
      const filteredFoods = result.filter((item: Meal) =>
        item.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setFoods(filteredFoods);
      if (filteredFoods.length === 0) {
        Alert.alert('No se encontró ninguna comida','Por favor, añade la comida que buscas.'
        );
      }
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  //Controlador de evento para cambiar el texto de busqueda 
  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (!text) {
      loadFoods();
    }
  };

  return (
    <View style={styles.container}>
      <Header />                      
      <TouchableOpacity
        style={styles.addFood}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.addFoodLegend}>Añadir comida</Text>  
        <View style={styles.addFoodBtnContainer}>
          <Icon name="add-circle" size={32} color="black" />  
        </View>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="manzana, carne, zumo..."
            value={search}
            onChangeText={handleSearchChange}
          />
        </View>
        <Button
          containerStyle={styles.searchButtonContainer}
          buttonStyle={styles.searchButton}
          icon={<Icon name="search" />}
          color="#c37eff"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal) => (
          <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    
  },
  addFoodBtnContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFood: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: 125,
    backgroundColor: '#ad5cff',
    borderRadius: 30,
  },
  addFoodLegend: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 20,
    marginTop: 25,
  },
  searchButtonContainer: {
    flex: 0,
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ad5cff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
  },
  searchButton: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ad5cff',
  },
});

export default AddFood;