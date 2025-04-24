import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import MapView,  { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Colors from '../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GOOGLE_API_KEY } from '../constants/Keys';
import useLocalitation from '../hooks/useLocalitation';
import { guardarRuta } from '../services/routeServices';

export default function MapScreen() {
  const {
    directions,
    location,
    handleAddressSelect,
    addMoreDestinations,
    removeDestinations,
  } = useLocalitation();

  const latitude = location?.coords.latitude ?? 19.432608;
  const longitude = location?.coords.longitude ?? -99.133209;

  const handleGuardarRuta = async () => {
    const lista_ubicaciones = directions.map((d) => d.coords); // coords debe ser { latitude, longitude }
    try {
      const idRuta = await guardarRuta({
        id_cobrador: '123456', // reemplaza con valor dinámico si es necesario
        lista_ubicaciones,
        zona: 'Zona A',
      });
      console.log('Ruta guardada con ID:', idRuta);
    } catch (error) {
      console.error('Error al guardar ruta:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteOverlay}>
        <View style={styles.formContainer}>
          <View style={styles.titles}>
            <Text style={styles.title}>Tu ruta</Text>
            <Text style={styles.titleApp}>
              Coppel<Text style={styles.titleAppHighLight}>Conecta</Text>
            </Text>
          </View>

          <View style={styles.inputsContainer}>
            {directions.map((direction, index) => (
              <View key={index} style={styles.inputRow}>
                <View style={styles.inputWrapper}>
                  <GooglePlacesAutocomplete
                    ref={(ref) => {
                      if (direction.id === '1' && ref && direction.address) {
                        ref.setAddressText(direction.address);
                      }
                    }}
                    placeholder={direction.label}
                    onPress={(data) => handleAddressSelect(direction.id, data)}
                    query={{
                      key: GOOGLE_API_KEY,
                      language: 'es',
                      location: `${location?.coords.latitude},${location?.coords.longitude}`,
                      radius: 50000,
                    }}
                    fetchDetails={true}
                    debounce={200}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    onFail={(error) => console.error(error)}
                    textInputProps={{
                      placeholderTextColor: '#999',
                      style: styles.input,
                    }}
                    styles={{
                      textInputContainer: { width: '100%' },
                      listView: {
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        elevation: 10,
                        zIndex: 9999,
                        position: 'absolute',
                      },
                    }}
                  />
                </View>

                {index === 0 && (
                  <TouchableOpacity onPress={addMoreDestinations} style={styles.addIcon}>
                    <Icon name="add-circle-outline" size={30} color={Colors.primario} />
                  </TouchableOpacity>
                )}
                {index === directions.length - 1 && directions.length > 2 && (
                  <TouchableOpacity onPress={removeDestinations} style={styles.addIcon}>
                    <Icon name='remove-circle-outline' size={30} color={Colors.primario}/>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, { marginTop: 12 }]}
            onPress={handleGuardarRuta}>
            <Text style={styles.buttonText}>Cargar ruta</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed ]}
            onPress={() => console.log("presionado")}>
            <Text style={styles.buttonText}>¡Comenzar ruta!</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} title="Estás aquí" />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
  },
  autocompleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: Colors.blanco,
    paddingTop: 40,
  },
  formContainer: {
    padding: 15,
    backgroundColor: Colors.blanco,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: Colors.negro,
    fontFamily: 'Redhat-Bold',
    marginBottom: 15,
  },
  titleApp: {
    fontSize: 24,
    color: Colors.primario,
    fontFamily: 'Redhat-Bold',
    marginBottom: 10,
  },
  titleAppHighLight: {
    color: Colors.secundario,
  },
  inputsContainer: {
    flexDirection: 'column',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primario,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.blanco,
    color: Colors.negro,
    fontSize: 16,
  },
  addIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.primario,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.blanco,
    fontSize: 18,
    fontFamily: 'Redhat-Bold',
  },
  buttonPressed: {
    opacity: 0.8,
    backgroundColor: Colors.secundario,
    transform: [{ scale: 0.95 }],
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
