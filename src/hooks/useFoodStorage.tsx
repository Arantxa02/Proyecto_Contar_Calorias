import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types"
import { createSolutionBuilderWithWatchHost } from "typescript";
import {isToday} from 'date-fns';

//Claves de Almacenamientos para los datos de alimentos
const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
    //Funcion interna para guardar la informacion en Ayncstorage
    const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
        try {  // Obtiene los datos actuales del almacenamiento
            const currentSavedFood = await AsyncStorage.getItem(storageKey);

            if (currentSavedFood !== null) {                    // Si hay datos existentes, los parsea y añade la nueva comida
                const currentSavedFoodParsed = JSON.parse(currentSavedFood);
                currentSavedFoodParsed.push(meal);

                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));                  // Guarda los datos actualizados en AsyncStorage
 
                return Promise.resolve();
            }

            await AsyncStorage.setItem(                // Si no hay datos existentes, guarda la nueva comida en un array
                storageKey,
                JSON.stringify([  
                    meal,
                ]));
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    const handleSaveFood = async ({ calorias, nombre, gramos }: Meal) => {        //Metodo para guardar la información de la comida
        try {
            const result = await saveInfoToStorage(MY_FOOD_KEY, {
                calorias,
                nombre,
                gramos,
            });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleGetFood = async () => {                //Metodo para obtener la comida
        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
            if (foods !== null) {
                const parsedFoods = JSON.parse(foods);
                return Promise.resolve(parsedFoods);
            }
            return Promise.resolve([]); // Devuelve un array vacío si no hay datos guardados
        } catch (error) {
            return Promise.reject(error);
        }
    };
    const handleSaveTodayFood = async ({ calorias, nombre, gramos }: Meal) => {
        try {
            const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
                calorias,
                nombre,
                gramos,
                date: new Date().toISOString(),
            });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    const handleGetTodayFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
            if (foods !== null) {
                const parseFoods = JSON.parse(foods);
                return Promise.resolve(parseFoods.filter(meal => meal.date && isToday(new Date(meal.date))),
                );
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    const handleRemoveTodayFood = async (index: number) => {
        try {
          const todayFood = await handleGetTodayFood();
          const filteredItem = todayFood?.filter((item: Meal, itemIndex) => {
            return itemIndex !== index;
          });
    
          await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filteredItem),
          );
    
          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      };


    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
        onSaveTodayFood: handleSaveTodayFood,
        onGetTodayFood: handleGetTodayFood,
        onDeleteTodayFood: handleRemoveTodayFood,
    };

};
export default useFoodStorage;