import { Text, View, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import RButtons from '../src/components/RButtons';
import {styles} from '../src/components/Styles';
import * as Application from 'expo-application';

export default function Votador () {

    const options = [
        { label: 'FAVOR', id: 1 },
        { label: 'CONTRA', id: 2 },
        { label: 'ABSTENCION', id: 3 },
      ];
    
      const [selectedOption, setSelectedOption] = useState(1);
      const [acuerdoActual, setAcuerdoActual] = useState(null);
      const [votanteId, setVotanteId] = useState(null);
      const [haVotado, setHaVotado] = useState(false);

    useEffect(() => {

        const id = Application.androidId;
        setVotanteId(id);
        cargarPrimerAcuerdo();
        
      }, []);
    
      const handleSelectionChange = (id) => {
        setSelectedOption(id);
    };

    const votar = async ()=>{
      // Encuentra la opcion seleccionada basandose en el ID almacenado en selectedOption.
      const optionSelected = options.find(option => option.id === selectedOption).label;

      await fetch('https://insatiable-flap.000webhostapp.com/votos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `optionselected=${optionSelected}&votanteId=${votanteId}`,
    })
      .catch(error => {
        console.error('Error al subir el voto:', error);
      });

      Alert.alert("Votado ✔","Haz Votado en: "+optionSelected);
      setHaVotado(!haVotado);
      //navigation.navigate('Inicio', {votado:true});
    };

    // Función para cargar el acuerdo
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

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Votante</Text>
          <Text style={{fontSize:15,paddingBottom:10}}>Acuerdo {acuerdoActual}</Text>
            <View style= {styles.container2}>      
            <RButtons 
            options={options}
            selectedOption={selectedOption}
            onSelectionChange={handleSelectionChange}
            />
          <TouchableOpacity style={styles.touchableButton} onPress={()=> { haVotado ? Alert.alert("Error","Ya Votaste ✔" + "\nEspera el siguiente acuerdo") : votar()} } ><Text style={styles.buttonText}>Votar</Text></TouchableOpacity>
            </View>
          <Image
            style={{width: 50,height:50,resizeMode:'contain',marginTop:15}}
            source={require('../src/escudo_udg.png')}
          />
        </View>
      );
  }

