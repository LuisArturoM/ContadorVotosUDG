import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Application from 'expo-application';

const RegVotante = () => {
  const [haVotado, setHaVotado] = useState(false);
  const [votanteId, setVotanteId] = useState(null);

  useEffect(() => {
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

  const verificarVoto = () => {
    if (votanteId !== null) {
      fetch(`https://insatiable-flap.000webhostapp.com/verifica_voto.php?votanteId=${votanteId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();
        })
        .then(data => {
          console.log('datos de verificar voto:', data);
          setHaVotado(data.haVotado);
        })
        .catch(error => {
          console.error('Error al cargar el primer acuerdo:', error);
        });
    }
  };

  // Renderizado condicional: no renderizar si votanteId es null
  if (votanteId === null) {
    return null;
  }

  return haVotado;
};

export default RegVotante;