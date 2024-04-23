import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements'

import Header from '../../components/Header/Header';

const AddFood = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.addFood}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Añadir Comida</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                <Button
                    icon={<Icon name="add-circle" />}
                    radius="lg"
                    color="#9933FF"
                    />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder='manzana, carne, zumo...'/>
                </View>
                <Button  color="#9933FF" icon={<Icon name="search"/>} />
                
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex:1,
    },
    legendContainer: {
        flex: 1,
         marginTop: 95,
    },
    addFoodBtnContainer:{
        flex: 0,
        width: 55,
        alignItems: 'flex-end',
        marginTop: 90,
    },
    addFood: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
     addFoodLegend:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 17,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
   inputContainer: {
        flex: 1,
        marginRight: 16,
    },
});

export default AddFood;
