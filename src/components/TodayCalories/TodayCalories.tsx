import React, {FC} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

type TodayCaloriesProps = {
  total: number | string;
  consumidas: number | string;
  restantes: number | string;
  porcentage: number;
}

const TodayCalories: FC<TodayCaloriesProps> = ({ total, consumidas, restantes, porcentage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}></View>
      <View style={styles.rightContainer}>
        <Text style={styles.hoy}>Comida de hoy</Text>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Consumidas</Text>
          <Text style={styles.rightItemValue}>{consumidas}</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Restantes</Text>
          <Text style={styles.rightItemValue}>{restantes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  leftContainer: {},
  rightContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  rigthItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  hoy: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,

  },
  rightItemLegend: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'right',
  },
});

export default TodayCalories;
