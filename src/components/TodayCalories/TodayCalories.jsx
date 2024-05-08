import React, {FC} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

type TodayCaloriesProps = {
  total: number | string;
  ingeridas: number | string;
  restantes: number | string;
  porcentage: number;
}

const TodayCalories: FC<TodayCaloriesProps> = ({
  total= 2000,
  ingeridas= 0,
  restantes= 0,
  porcentage= 0,
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
      <Text style={styles.hoy}>Comida de hoy</Text>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Total:</Text>
          <Text style={styles.rightItemValue}>{total} Kcal</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Ingeridas:</Text>
          <Text style={styles.rightItemValue}>{ingeridas} Kcal</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Restantes:</Text>
          <Text style={styles.rightItemValue}>{restantes} Kcal</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
         <ProgressCircle
            percent={porcentage}
            radius={70}
            borderWidth={10}
            color="#ebd6ff"
            shadowColor="#9689a2"
            bgColor="#fff"
        >
            <Text style={styles.percentText}>{porcentage}%</Text>
        </ProgressCircle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rigthItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  hoy: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    marginLeft: 9,
  },
  rightItemLegend: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 9,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'center',
  },
  percentText:{
    fontSize: 25,
  },
});

export default TodayCalories;
