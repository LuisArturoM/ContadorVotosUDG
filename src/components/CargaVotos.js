import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./Styles";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const CargarVotos = ({ acuerdoActual, actualizarValorVotantes}) => {
  const [valFavor, setValFavor] = useState(0);
  const [valContra, setValContra] = useState(0);
  const [valAbstencion, setValAbstencion] = useState(0);

  useEffect(() => {
    cargarVotos();
    //Intervalo de 1 segundo para cargar los votos
    const intervalId = setInterval(cargarVotos, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [acuerdoActual]); 


  const cargarVotos = async () => {
    try {
      const response = await fetch(
        "https://insatiable-flap.000webhostapp.com/c_votos.php"
      );

      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }

      const data = await response.json();

      console.log("Votos cargados:", data);

      setValFavor(data.favor);
      setValContra(data.contra);
      setValAbstencion(data.abstencion);
      actualizarValorVotantes(Number(data.favor)+Number(data.contra)+Number(data.abstencion));
    } catch (error) {
      console.error("Error al cargar los votos:", error);
    }
  };




    return(
      
      <View style={{alignItems:'flex-start'}}>
        <View style={{alignItems:'center',flexDirection:'row',}}>
          <Text style={styles.subtitle}>Favor </Text>
          <View style={{paddingLeft:'31%'}}>
            <View style={styles.circle}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{valFavor }</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems:'center',flexDirection:'row',}}>
          <Text style={styles.subtitle}>Contra </Text>
          <View style={{paddingLeft:'27%'}}>
            <View style={styles.circle}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{valContra}</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems:'center',flexDirection:'row',}}>
          <Text style={styles.subtitle}>Abstencion </Text>
          <View style={{paddingLeft:'5%'}}>
            <View style={styles.circle}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{valAbstencion}</Text>
            </View>
          </View>
        </View>
    </View>
    );
};

export default CargarVotos;