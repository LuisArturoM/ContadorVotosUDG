import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const LoginModal = ({ isVisible, onClose, haVotado}) => {
  const [username1, setUsername] = useState('');
  const [password1, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {

    if (username1.trim() === '' || password1.trim() === '' ) {
        Alert.alert('¡Alerta!',"Por favor, completa todos los campos.");
    }
    else{
        await verificar_login();
        onClose();
        setUsername('');
        setPassword('');
    }
    // Puedes agregar tu lógica de registro real aquí
  };

  
  const verificar_login = async () =>{
    await fetch(`https://insatiable-flap.000webhostapp.com/verifica.php?correo=${username1}&password=${password1}`)
    .then(response => response.text())
    .then((response) => {
        if(response === "3" || response === "0"){
            Alert.alert("Credenciales","Correo o password no reconocido");
        }
        else{
            if(username1 === "Contador1"){
                Alert.alert("Credenciales",`Validacion Exitosa Bienvenido \n- ${username1} - `);
                navigation.navigate("Contador");
            }
            else{
                if(haVotado){
                    Alert.alert("Espera....", "Usted ya ha votado, espere al siguiente acuerdo");
                    return;
                }
                Alert.alert("Credenciales","Validacion Exitosa Bienvenido Votador");
                navigation.navigate("Votador");
            }

        }
    })
    .catch(err => console.log(err))
};

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginModal;