import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

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

  useEffect(() => {
    const fetchAddress = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=AIzaSyAXazeDkwAPIcn0OpPyujCLrSkpDXh7lD4`
            );
            const data = await response.json();
            if (data.results.length > 0) {
                setAddress(data.results[3].formatted_address);
            }
            
        } catch (error) {
            console.error('Error fetching addresss:', error);
        }
    };

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
