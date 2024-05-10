import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {            
       //Validación de los campos vacíos                                    
      Alert.alert('Campos Incompletos', 'Por favor introduce tus datos.');   
    } else {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Restablecer los campos de entrada después del inicio de sesion exitoso
        setEmail('');
        setPassword('');
        setShowPassword(false);
        navigation.navigate('Home');  //Redirrecionar a la pantalla home
      } catch (error) {
        Alert.alert('Error de inicio de sesión', error.message);  //Alerta de error de inicio de sesion
      }
    }
  };

  useEffect(() => {
    // Limpiar los campos 
    return () => {
      setEmail('');
      setPassword('');
      setShowPassword(false);
    };
  }, []);

  const staticInfo = {
    uri: 'https://tint.creativemarket.com/p8pw0iE3LxNGaOT7Go0jb8-zvjf27VWTPrxViSH1iyY/width:1200/height:800/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzkxMS85MTE3LzkxMTc0NDIvMjAtMDgtMTEtbnV0cml0aW9uLWZhY3RzLWxhYmVsLWNvbG9yLSUyODElMjktby5qcGc?1601027502&fmt=webp',
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido!</Text>
      <Image source={{uri: staticInfo.uri}} style={styles.profileImage} resizeMode="stretch"/>
      <View style={styles.inputContainer}>
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
            secureTextEntry={!showPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#8A2BE2" />  
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}  //Manejador de inicio de sesión
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 40,
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

export default Login;