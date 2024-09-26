import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa esta función para crear cuentas
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'; //Configuración de Firebase

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  //Función para manejar el registro de ususario
  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      //Validacion de campos vacios
      Alert.alert('Campos Incompletos', 'Por favor completa todos los campos');
    } else if (password !== confirmPassword) {
      //validacion de contraseñas coincidentes
      Alert.alert('Contraseñas no coinciden', 'Por favor verifica que las contraseñas coincidan');
    } else {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Alerta de que laa cuenta fue creada exitosamente
        Alert.alert(
          'Cuenta Creada',
          '¡Tu cuenta ha sido creada exitosamente!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');  //Redireccionar a la pantalla de inicio de sesión
                //Restablecer los campos después del registro exitoso
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        Alert.alert('Error al crear la cuenta', error.message);
      }
    }
  };

  const staticInfo = {
    uri: 'https://tint.creativemarket.com/p8pw0iE3LxNGaOT7Go0jb8-zvjf27VWTPrxViSH1iyY/width:1200/height:800/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzkxMS85MTE3LzkxMTc0NDIvMjAtMDgtMTEtbnV0cml0aW9uLWZhY3RzLWxhYmVsLWNvbG9yLSUyODElMjktby5qcGc?1601027502&fmt=webp',
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Introduce los datos necesarios!</Text>
      <Image source={{uri: staticInfo.uri}} style={styles.profileImage} resizeMode="stretch"/>
      <View style={styles.inputContainer}>
        <View style={styles.iconInput}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="person" size={24} color="#8A2BE2" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.iconInput}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="person" size={24} color="#8A2BE2" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.iconInput}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="mail" size={24} color="#8A2BE2" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.iconInput}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="lock-closed" size={24} color="#8A2BE2" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Usar el estado para mostrar u ocultar la contraseña
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#8A2BE2" />
          </TouchableOpacity>
        </View>
        <View style={styles.iconInput}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="lock-closed" size={24} color="#8A2BE2" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword} 
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#8A2BE2" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup} //Manejador de registro de usuario
        >
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: '80%',
    height: 150,
    borderRadius: 10,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative', // Agregar posición relativa para el ícono del ojo
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  }
});

export default Signup;
