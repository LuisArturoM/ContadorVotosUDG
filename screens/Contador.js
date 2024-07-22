import { View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {styles} from '../src/components/Styles';
import CargarVotos from '../src/components/CargaVotos';

export default function Contador() {

  // Estado para llevar la cuenta del acuerdo actual
  const [acuerdoActual, setAcuerdoActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalVotos, setTotalVotos] = useState(0);

  useEffect(() => {
    // Cargar el primer acuerdo al montar el componente
    cargarPrimerAcuerdo();
  }, []);

  // Función para cargar el acuerdo
  const cargarPrimerAcuerdo = async () => {
    try {
      const response = await fetch('https://insatiable-flap.000webhostapp.com/c_acuerdos.php');
  
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
  
      const data = await response.json();
  
      console.log('Primer acuerdo cargado:', data);
      setAcuerdoActual(data.acuerdo);
    } catch (error) {
      console.error('Error al cargar el primer acuerdo:', error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  
    const alertaAcuerdo=()=>{

      if(totalVotos>=1){
        Alert.alert('Acuerdo: ' + acuerdoActual, 'Desea pasar al siguiente acuerdo?', [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {text: 'Si', onPress: () => siguienteAcuerdo()},
        ]);
      }
      else{
        Alert.alert('¡Alerta! ', 'Aun no se reunen los '+ 1 + ' votos necesarios', [
          {
            text: 'OK',
          }
        ]);
      }
    }

    // Función para pasar al siguiente acuerdo
  const siguienteAcuerdo = async () => {
      await btnAceptar();
      cargarPrimerAcuerdo();
    };

    const btnAceptar = async () => {
      try {
        const response = await fetch('https://insatiable-flap.000webhostapp.com/acuerdos.php');
    
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
    
        const data = await response.text();
    
        console.log('success', data);
      } catch (error) {
        console.error('error', error);
      }
    };


    const actualizarValorVotantes = (nuevoValor) => {
      setTotalVotos(nuevoValor);
    };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>
      <Text style={{fontSize:20,paddingBottom:15}}>Acuerdo {acuerdoActual} </Text>
      <View style= {styles.container2}>      
        {!loading && <CargarVotos acuerdoActual={acuerdoActual} actualizarValorVotantes={actualizarValorVotantes} />}
        <TouchableOpacity style={styles.touchableButton} onPress={()=> alertaAcuerdo()} ><Text style={styles.buttonText}>Siguiente</Text></TouchableOpacity>
      </View>
      <Image
        style={{width: 50,height:50,resizeMode:'contain',marginTop:15}}
        source={require('../src/escudo_udg.png')}
      />
    </View>
  )
}