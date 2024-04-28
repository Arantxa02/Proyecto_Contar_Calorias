import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types"

const MY_FOOD_KEY = '@MyFood:Key';

const useFoodStorage = () => {
    const handleSaveFood = async ({ calorias, nombre, gramos }: Meal) => {        //Metodo para guardar la información de la comida
        try {
            const currentSavedFood = await AsyncStorage.getItem(MY_FOOD_KEY);

            if (currentSavedFood !== null) {
                const currentSavedFoodParsed = JSON.parse(currentSavedFood);
                currentSavedFoodParsed.push({
                    calorias,
                    nombre,
                    gramos,
                });

                await AsyncStorage.setItem(MY_FOOD_KEY, JSON.stringify(currentSavedFoodParsed));

                return Promise.resolve();
            }

            await AsyncStorage.setItem(
                MY_FOOD_KEY,
                JSON.stringify([
                    {
                        calorias,
                        nombre,
                        gramos,
                    },
                ]));
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

    return{
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
    };

};

export default useFoodStorage;