import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const RegisterModal = ({ isVisible, onClose, haVotado}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        Alert.alert('¡Alerta!',"Por favor, completa todos los campos.");
    }
    else{
        await registrar();
        onClose();
        setUsername('');
        setEmail('');
        setPassword('');
    }
  };

  const registrar = async () =>{
    await fetch(`https://insatiable-flap.000webhostapp.com/datos.php?nombre=${username}&correo=${email}&password=${password}`)
    .then(response => response.text())
    .then((response) =>{
        if(response === '1'){
          
            Alert.alert("Bienvenido","Felicidades te haz registrado correctamente");
            if(!haVotado)navigation.navigate("Votador");
            if(haVotado)Alert.alert("Registro Completo","No puede ser dirigido a la pantalla votante, usted ya voto");
        }
        
        if(response === '0')Alert.alert("Error","Usuario/Correo ya existente");
    })
    .catch(err => console.log(err));
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
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
  registerButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
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

export default RegisterModal;