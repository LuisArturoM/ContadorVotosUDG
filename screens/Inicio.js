import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import PasswordModal from "../src/components/Modal1"
import RegVotante from '../src/components/RegVotante';
import * as Application from 'expo-application';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

export default function Inicio( {navigation, route} ) {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [acuerdoActual, setAcuerdoActual] = useState(null);
  const [haVotado, setHaVotado] = useState(false);
  const [votanteId, setVotanteId] = useState(null);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('Contador');
  };


  useEffect(() => {
    // Cargar el primer acuerdo al montar el componente
    cargarPrimerAcuerdo();
    const id = Application.androidId;
    setVotanteId(id);
    registrarVotante();
    verificarVoto();

    const intervalId = setInterval(() => {
      verificarVoto();
    }, 1000);

    // Agregar un listener al evento 'focus'
    const focusListener = navigation.addListener('focus', ()  => {
      verificarVoto();
    },[haVotado]);

    // Limpiar el listener al desmontar el componente
    return () => {
      focusListener();
      clearInterval(intervalId);
    };
  }, [votanteId]);

  const cargarPrimerAcuerdo = () => {
    fetch('https://insatiable-flap.000webhostapp.com/c_acuerdos.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then(data => {
        console.log('Primer acuerdo cargado:', data);
        setAcuerdoActual(data.acuerdo);
      })
      .catch(error => {
        console.error('Error al cargar el primer acuerdo:', error);
      });
  };

  const registrarVotante = () => {
    try {
      fetch('https://insatiable-flap.000webhostapp.com/votantes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ votante_id: votanteId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al registrar el votante:', error);
        });
    } catch (error) {
      console.error('Error al registrar el votante:', error);
    }
  };

  const verificarVoto = async () => {
    try {
      if (votanteId !== null) {
        const response = await fetch(`https://insatiable-flap.000webhostapp.com/verifica_voto.php?votanteId=${votanteId}`);
  
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
  
        const data = await response.json();
  
        console.log('datos de verificar voto:', data);
        setHaVotado(data.haVotado);
      }
    } catch (error) {
      console.error('Error al verificar el voto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador de Votos</Text>
      <Text style= {styles.subtitle}>¿Votador o Contador?</Text>
        <View style= {styles.container2}>
        {haVotado==true && <Text style={{fontSize: 15,color: '#003366',textAlign: 'center',marginTop: 3,marginBottom:50,fontWeight: 'bold',}}>Ya haz votado. Espera el siguiente acuerdo</Text>}      
        <TouchableOpacity style={styles.touchableButton} onPress={()=> navigation.navigate('Votador') } disabled={haVotado} ><Text style={styles.buttonText}>Votador</Text></TouchableOpacity>
        <TouchableOpacity style={styles.touchableButton} onPress={handleOpenModal}><Text style={styles.buttonText}>Contador</Text></TouchableOpacity>
          <PasswordModal
            isVisible={isModalVisible}
            onConfirm={handleConfirm}
            onCancel={handleCloseModal}
          />
        </View>
        <Image
        style={{width: 50,height:50,resizeMode:'contain',marginTop:15}}
        source={require('../src/escudo_udg.png')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  container2:{
    flex: 1,
    backgroundColor: '#d6eaf8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft:"2%",
    paddingRight:"2%",
    width: "80%",
    borderRadius:50,
    borderWidth:1,
    borderColor: '#5fa5e8'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: "5%",
    paddingBottom: "5%",
    color: '#004080',
  },
  subtitle:{
    fontSize: 30,
    paddingTop: "5%",
    paddingBottom: "15%",
    color:'#0FB5D9',
  },
  touchableButton:{
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width:'90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText:{
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
