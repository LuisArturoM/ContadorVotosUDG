import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LoginModal from '../src/components/ModalLogin';
import RegisterModal from '../src/components/ModalRegister';
import * as Application from 'expo-application';

export default function Login (){

    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isRegModalVisible, setRegModalVisible] = useState(false);
    const [votanteId, setVotanteId] = useState(null);
    const [haVotado, setHaVotado] = useState(false);

    useEffect(()=>{
        const id = Application.androidId;
        setVotanteId(id);
        if (votanteId !== null) {
            registrarVotante();
            verificarVoto();
        }
    }, [votanteId]);

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

    const toggleLoginModal = () => {
      setLoginModalVisible(!isLoginModalVisible);
    };

    const toggleRegModal = () => {
        setRegModalVisible(!isRegModalVisible);
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
            <Text style={styles.title}>Bienvenido</Text>
            <Text style= {styles.subtitle}>Votador UDG</Text>
            
            <View style={styles.container2}>
                <Text style={{fontSize: 25,paddingTop: "1%",paddingBottom: "5%",color:'#0F76D9',fontWeight:'bold',}}>¿Que desea Hacer?</Text>
                <TouchableOpacity style={styles.touchableButton} onPress={()=>{toggleLoginModal(); verificarVoto();}} ><Text style={styles.buttonText}>Iniciar Sesión</Text></TouchableOpacity>
                <LoginModal isVisible={isLoginModalVisible} onClose={toggleLoginModal} haVotado={haVotado} votanteId={votanteId} />
                <TouchableOpacity style={styles.touchableButton} onPress={()=>{toggleRegModal(); verificarVoto();}}><Text style={styles.buttonText}>Registrarse</Text></TouchableOpacity>
                <RegisterModal isVisible={isRegModalVisible} onClose={toggleRegModal} haVotado={haVotado} />
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
      paddingTop: "5%",
      paddingBottom: "5%",
      marginTop: '5%',
      marginBottom: '5%',
      paddingLeft:"2%",
      paddingRight:"2%",
      width: "80%",
      borderRadius:50,
      borderWidth:1,
      borderColor: '#5fa5e8'
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      paddingTop: "1%",
      paddingBottom: "2%",
      marginTop:'1%',
      color: '#004080',
      borderTopWidth:1,
      borderTopColor:'blue'

    },
    subtitle:{
      fontSize: 30,
      paddingTop: "1%",
      paddingBottom: "5%",
      color:'#0F76D9',
      borderBottomWidth:1,
      borderBottomColor:'blue'
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



