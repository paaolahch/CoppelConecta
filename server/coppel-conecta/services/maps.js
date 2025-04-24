const axios = require('axios');
require('dotenv').config(); // Para usar la API Key desde .env

const buscarNegociosPequenos = async (latitud, longitud, radio = 1000) => {
  const url = 'https://google-map-places-new-v2.p.rapidapi.com/v1/places/nearbysearch';

  const headers = {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'google-map-places-new-v2.p.rapidapi.com'
  };

  const params = {
    location: `${latitud},${longitud}`,
    radius: radio,
    type: 'store' // Usamos "store" como base
  };

  try {
    const response = await axios.get(url, { headers, params });

    // Filtrar por nombres y categorías que podrían ser negocios pequeños
    const negociosPequenos = response.data.results.filter(negocio => {
      const nombre = negocio.name?.toLowerCase() || '';
      return (
        nombre.includes('miscelánea') ||
        nombre.includes('papelería') ||
        nombre.includes('abarrotes') ||
        nombre.includes('conveniencia') ||
        nombre.includes('mini') ||
        nombre.includes('tienda') ||
        nombre.includes('local') ||
        nombre.includes('boutique') ||
        nombre.includes('bodega') ||
        nombre.includes('kiosco') ||
        nombre.includes('minisuper')
      );
    });

    return negociosPequenos.map(place => ({
      nombre: place.name,
      direccion: place.vicinity,
      ubicacion: {
        latitud: place.geometry.location.lat,
        longitud: place.geometry.location.lng
      },
      googlePlaceId: place.place_id,
      rating: place.rating || null,
      tipo: place.types || []
    }));
  } catch (error) {
    console.error('Error al buscar negocios pequeños:', error.response?.data || error.message);
    throw new Error('No se pudieron obtener negocios pequeños');
  }
};

// Ejemplo de uso:
buscarNegociosPequenos(19.4326, -99.1332)
  .then(resultados => console.log(resultados))
  .catch(error => console.error(error));
