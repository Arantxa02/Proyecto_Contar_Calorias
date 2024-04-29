import React, { FC, useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';

import useFoodStorage from '../../hooks/useFoodStorage'

type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void,
  visible: boolean,
};

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calorias, setCalories] = useState('');
  const [nombre, setName] = useState('');
  const [gramos, setPortion] = useState('');
  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible]);

  const handleAddPress = async () => {
  if (calorias.trim() === '' || nombre.trim() === '' || gramos.trim() === '') {
    return;
  }

  try {
    await onSaveFood({
      calorias,
      nombre,
      gramos,
    });

    Alert.alert('Alimento añadido','La comida ha sido añadida correctamente.',
      [{
          text: 'OK',
          onPress: onClose,
        },
      ],
      { cancelable: false }
    );

    onClose(true);
  } catch (error) {
    console.error(error);
  }
};
  
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={30} />}
              type="clear"
              onPress={() => onClose()}
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={nombre}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Kcal</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={calorias}
                onChangeText={(text) => setCalories(text)}
              />
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>gr</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={gramos}
                onChangeText={(text) => setPortion(text)}
              />
            </View>
          </View>
          <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Añadir"
                icon={<Icon name="add" size={25} color="#fff" />}
                radius="lg"
                color="#9933FF"
                onPress={handleAddPress}
                disabled={
                  calorias.trim() === '' ||
                  nombre.trim() === '' ||
                  gramos.trim() === ''
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 24,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});

export default AddFoodModal;