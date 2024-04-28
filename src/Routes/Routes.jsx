import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';

import Home from '../Screens/Home/Home';
import AddFood from '../Screens/AddFood/AddFood';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={routesScreenDefaultOptions}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={routesScreenDefaultOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
