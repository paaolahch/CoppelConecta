import { useState, useEffect } from 'react';
import { Direction } from '../types/types-direction';
import * as Location from 'expo-location';
import { GOOGLE_API_KEY } from '../constants/Keys';

export default function useLocalitation() {
  const [directions, setDirections] = useState<Direction[]>([
    { id: '1', label: 'Punto de partida', address: '' },
    { id: '2', label: 'Destino', address: '' },
  ]);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>('');

  const handleAddressSelect = (id: string, data: any) => {
    setDirections((prevDirections) =>
      prevDirections.map((dir) =>
        dir.id === id ? { ...dir, address: data.description } : dir
      )
    );
  };

  const addMoreDestinations = () => {
    const newId = (directions.length + 1).toString();
    setDirections([
      ...directions,
      { id: newId, label: `Destino ${+newId - 1}`, address: '' },
    ]);
  };

  const removeDestinations = () => {
    if (directions.length > 2) {
      const aux = [...directions];
      aux.pop();
      setDirections(aux);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      const { latitude, longitude } = loc.coords;

      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

      try {
        const res = await fetch(geocodeUrl);
        const data = await res.json();
        const address = data.results[0]?.formatted_address || 'Ubicación actual';
        setCurrentAddress(address);

        setDirections((prev) =>
          prev.map((dir) =>
            dir.id === '1' ? { ...dir, address } : dir
          )
        );
      } catch (err) {
        console.error('Error al obtener dirección:', err);
      }
    })();
  }, []);

  return {
    directions,
    location,
    currentAddress,
    handleAddressSelect,
    addMoreDestinations,
    removeDestinations,
    setDirections, // útil si quieres actualizar todo desde fuera
  };
}
