import React, { FC } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import MealItem from '../MealItem/MealItem';
import { Meal } from '../../types/index';

type TodayMealsProps = {
  foods: Meal[];
  onCompleteAddRemove?: () => void;
};

const TodayMeals: FC<TodayMealsProps> = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, index) => (
          <MealItem
                isAbleToAdd={false} key={`today-meal-item-${meal.nombre}-${index}`}
                {...meal}
                onCompleteAddRemove={onCompleteAddRemove}
                itemPosition={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 16,
  },
});

export default TodayMeals;
