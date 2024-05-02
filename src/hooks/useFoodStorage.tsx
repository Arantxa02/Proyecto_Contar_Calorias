import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types"
import { createSolutionBuilderWithWatchHost } from "typescript";
import {isToday} from 'date-fns';

const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
    const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
        try {
            const currentSavedFood = await AsyncStorage.getItem(storageKey);

            if (currentSavedFood !== null) {
                const currentSavedFoodParsed = JSON.parse(currentSavedFood);
                currentSavedFoodParsed.push(meal);

                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));

                return Promise.resolve();
            }

            await AsyncStorage.setItem(
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

    const handleGetFood = async () => {        //Metodo para obtener la información de la comida
        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
            if (foods !== null) {
                const parseFoods = JSON.parse(foods);
                return Promise.resolve(parseFoods);
            }
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