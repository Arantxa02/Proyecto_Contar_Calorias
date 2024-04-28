import React, { FC } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Alert } from "react-native";



const MealItem: FC<Meal> = ({ calorias, nombre, gramos }) => {
    const { onSaveTodayFood } = useFoodStorage();


    const handleAddItemPress = async () => {
        try {
            await onSaveTodayFood({
                nombre,
                calorias,
                gramos
            });
            Alert.alert("Comida del día agregada correctamente");
        } catch (error) {
            console.error(error);
            Alert.alert("Comida del día no agregada ");
        }
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.leftconatiner}>
                <Text style={styles.nombre}>{nombre}</Text>
                <Text style={styles.gramos}>{gramos}gr</Text>
            </View>
            <View style={styles.rightconatiner}>
                <Button icon={<Icon name="add-circle-outline" size={25} />}
                    type="clear"
                    onPress={handleAddItemPress}
                />
                <Text style={styles.calorias}>{calorias} Kcal </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#d2a5f7',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
    },
    leftconatiner: {
        flex: 1,
        justifyContent: 'center',

    },
    rightconatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    gramos: {
        fontSize: 15,
        color: '#808080',
        fontWeight: 'bold',
    },
    calorias: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MealItem;