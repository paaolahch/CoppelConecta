import { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { GOOGLE_API_KEY, ROUTIFIC_API_KEY } from '../constants/Keys';
import {
  LatitudLongitud,
  Visits,
  RoutificRequestBody,
  RoutificResponse
} from '../types/types-routific';


export default function useOptimizadedRoute() {
    
   const [coordinates, setCoordinates] = useState<LatitudLongitud[]>([]);
   const [routeOrder, setRouteOrder] = useState<LatitudLongitud[]>([]);

  const geocodeAddress = async (address: string): Promise<LatitudLongitud | null> => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: { address, key: GOOGLE_API_KEY },
      }
    );
    const location = res.data.results[0]?.geometry.location;
    return location
      ? { latitude: location.lat, longitude: location.lng }
      : null;
  };

  const handleRoute = async (addresses: string[], userLocation?: LatitudLongitud) => {
    const geocoded = await Promise.all(addresses.map(geocodeAddress));
    const valid = geocoded.filter(Boolean) as LatitudLongitud[];

    if (valid.length < 2) {
      Alert.alert('Error', 'Ingresa al menos dos direcciones válidas.');
      return;
    }

    const allCordinates: LatitudLongitud[] = [userLocation as LatitudLongitud, ...valid];
    setCoordinates(allCordinates);

    // Preparamos el JSON para Routific
    const visits: Visits = {};
    valid.forEach((point, idx) => {
      visits[`stop_${idx}`] = {
        location: {
          name: addresses[idx],
          lat: point.latitude,
          lng: point.longitude,
        },
      };
    });

    const body: RoutificRequestBody = {
      visits,
      fleet: {
        vehicle_1: {
          start_location: valid[0], // Comienza desde la primera dirección
        },
      },
    };

    try {
      const response = await axios.post<RoutificResponse>(
        'https://api.routific.com/v1/vrp',
        body,
        {
          headers: { Authorization: `Bearer ${ROUTIFIC_API_KEY}` },
        }
      );

      const route = response.data.solution?.vehicle_1;
      if (!route) {
        Alert.alert('Error', 'No se pudo optimizar la ruta.');
        return;
      }

      const orderedStops = route.map((stop) => {
        const idx = parseInt(stop.split('_')[1], 10);
        return valid[idx];
      });

      setRouteOrder(orderedStops);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema con Routific.');
      console.error(error);
    }
  };

    return {
        coordinates,
        routeOrder,
        handleRoute,
    };
}
