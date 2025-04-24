import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Colors from '../constants/Colors';
import { registerBusiness } from '../services/businessServices';

const RegisterClientScreen: React.FC = () => {
  const [form, setForm] = useState({
    nombreNegocio: '',
    ubicacion: '',
    giro: '',
    ingreso: '',
    fechaApertura: '',
    telefono: '',
    propietario: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleObtenerUbicacion = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la ubicación.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const direccion = await Location.reverseGeocodeAsync({ latitude, longitude });

      const { street, name, city, region } = direccion[0];
      const direccionFormateada = `${street || name}, ${city}, ${region}`;
      handleChange('ubicacion', direccionFormateada);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo obtener la ubicación.');
    }
  };

  const handleGuardarNegocio = async () => {
    const { nombreNegocio, ubicacion, giro, ingreso, fechaApertura, telefono, propietario } = form;

    if (!nombreNegocio || !ubicacion || !giro || !ingreso || !fechaApertura || !telefono || !propietario) {
      Alert.alert('Faltan datos', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const id = await registerBusiness({
        name: nombreNegocio,
        location: ubicacion,
        giro,
        ingreso,
        fechaApertura,
        telefono,
        propietario,
      });

      Alert.alert('Negocio registrado', `ID: ${id}`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo registrar el negocio.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            <Text>Coppel</Text>
            <Text style={styles.highlight}>Emprende</Text>
          </Text>
          <View>
            <Text style={styles.slogan}>Avanzando juntos</Text>
          </View>
        </View>

        <Text style={styles.title}>Registremos al emprendedor!</Text>

        <Text style={styles.label}>Nombre del negocio</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Taquería El Fogón"
          placeholderTextColor="#888"
          value={form.nombreNegocio}
          onChangeText={value => handleChange('nombreNegocio', value)}
        />

        <Text style={styles.label}>Ubicación del negocio</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.locationButton} onPress={handleObtenerUbicacion}>
            <Text style={styles.locationButtonText}>Usar ubicación actual</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={form.ubicacion}
          onChangeText={value => handleChange('ubicacion', value)}
          placeholder="Ej. Calle Reforma #123"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Giro del negocio</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.giro}
            onValueChange={(value) => handleChange('giro', value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un giro" value="" />
            <Picker.Item label="Alimentos" value="alimentos" />
            <Picker.Item label="Tlapalería" value="tlapaleria" />
            <Picker.Item label="Ropa y calzado" value="ropa" />
            <Picker.Item label="Papelería" value="papeleria" />
            <Picker.Item label="Servicios estéticos" value="estetica" />
          </Picker>
        </View>

        <Text style={styles.label}>Ingreso estimado mensual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 8000"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={form.ingreso}
          onChangeText={value => handleChange('ingreso', value)}
        />

        <Text style={styles.label}>Fecha de apertura</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 15/03/2023"
          placeholderTextColor="#888"
          value={form.fechaApertura}
          onChangeText={value => handleChange('fechaApertura', value)}
        />

        <Text style={styles.label}>Teléfono celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 5551234567"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={form.telefono}
          onChangeText={value => handleChange('telefono', value)}
        />

        <Text style={styles.label}>Nombre del propietario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Juan Pérez"
          placeholderTextColor="#888"
          value={form.propietario}
          onChangeText={value => handleChange('propietario', value)}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleGuardarNegocio}
        >
          <Text style={styles.buttonText}>¡Tenemos nuevo emprendedor!</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterClientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
    paddingHorizontal: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    fontSize: 36,
    fontFamily: 'Circular-std',
    color: Colors.primario,
  },
  highlight: {
    color: Colors.secundarioLight,
  },
  slogan: {
    fontSize: 18,
    color: Colors.secundarioLight,
    textAlign: 'left',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: Colors.primario,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  locationButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
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
    backgroundColor: Colors.secundarioLight,
    transform: [{ scale: 0.95 }],
},
});
