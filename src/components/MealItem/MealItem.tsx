import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { Meal } from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import { Alert } from 'react-native';

type MealItemProps = Meal & {
  isAbleToAdd: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition?: number;
};

const MealItem: FC<MealItemProps> = ({
  calorias,
  nombre,
  gramos,
  isAbleToAdd,
  onCompleteAddRemove,
  itemPosition,
}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({
          nombre,
          calorias,
          gramos,
        });
        Alert.alert(
          `"${nombre}" se añadio correctamente con ${calorias}Kcal y ${gramos}gr.`
        );
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert(`"${nombre}" se elimino correctamente.`);
      }
      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert('Comida del día no agregada. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.gramos}>{gramos}gr</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <Text style={styles.calorias}>{calorias} Kcal</Text>
          <Button
            icon={
              <Icon
                name={isAbleToAdd ? 'add-circle-outline' : 'trash'}
                size={30}
              />
            }
            type="clear"
            onPress={handleIconPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebd6ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MealItem;