import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
                    <Text style={styles.addFoodLegend}>Añadir comida</Text>
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
                    <Input placeholder='manzana, carne, zumo...' />
                </View>
                <Button
                    containerStyle={styles.searchButtonContainer}
                    buttonStyle={styles.searchButton}
                    icon={<Icon name="search" />}
                    color="#9933FF"
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
    },
    legendContainer: {
        flex: 1,
        marginTop: 120,
    },
    addFoodBtnContainer: {
        flex: 0,
        width: 60,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 88,
    },
    addFood: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    addFoodLegend: {
        fontSize: 22,
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
        marginRight: 20,
      },
      
      searchButtonContainer: {
        flex: 0,
        width: 50,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9933FF',
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: -25,
      },
      
      searchButton: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#9933FF',
      },
});

export default AddFood;