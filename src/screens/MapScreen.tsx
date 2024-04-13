import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

// Define la interfaz RouteParams para tipar los parámetros de la ruta
interface RouteParams {
  nombre: string;
  apellido: string;
  latitud: string;
  longitud: string;
}

export default function MapScreen() {
  const route = useRoute();
  const { nombre, apellido, latitud, longitud } = route.params as RouteParams;
  const [address, setAddress] = useState('');

  // useEffect para realizar acciones una vez que el componente se haya renderizado
  useEffect(() => {
    // Define una función asincrónica para obtener la dirección utilizando las coordenadas de latitud y longitud
    const fetchAddress = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=key`
            );
            const data = await response.json();
            // Verifica si se obtuvieron resultados de la solicitud
            if (data.results.length > 0) {
                setAddress(data.results[3].formatted_address);
            }
            
        } catch (error) {
            console.error('Error fetching addresss:', error);
        }
    };

    // Llama a la función fetchAddress cuando el componente se monta
    fetchAddress();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(latitud),
          longitude: parseFloat(longitud),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitud),
            longitude: parseFloat(longitud),
          }}
          title={`${nombre} ${apellido}`}
          description={address}
        />
      </MapView>
    </View>
  );
}
