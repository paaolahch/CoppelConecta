import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { validationSchema } from '../utils/VaidationRegisterForm';
import FormInput from '../components/FormInput';
import { registerUserWithData } from '../services/authServices'; 
import Colors from '../constants/Colors';
import { CheckBox } from 'react-native-elements';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const handleRegister = async (values: any) => {
    console.log("🚀 handleRegister ejecutado con:", values);
    try {
      const uid = await registerUserWithData(values);
      console.log("✅ Usuario registrado con UID:", uid);
      Alert.alert('¡Éxito!', 'Usuario registrado correctamente');
      navigation.replace('Profile');
    } catch (error: any) {
      console.error("❌ Error en registro:", error);
      Alert.alert('Error', error.message || 'Hubo un problema registrando al usuario.');
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleApp}>
          Coppel<Text style={styles.titleAppHighLight}>Conecta</Text>
        </Text>
        <Text style={styles.title}>Registro Express</Text>

        <Formik
          initialValues={{
            name: '',
            numEmployee: '',
            sucursal: '',
            email: '',
            password: '',
            confirmPassword: '',
            postalCode: '',
            phoneNumber: '',
            acceptedTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <>
              <FormInput
                icon="person"
                placeholder="Nombre"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => handleBlur('name')}
                error={errors.name}
                touched={touched.name}
              />
              <FormInput
                icon="badge"
                placeholder="Número de empleado"
                value={values.numEmployee}
                onChangeText={handleChange('numEmployee')}
                onBlur={() => handleBlur('numEmployee')}
                error={errors.numEmployee}
                touched={touched.numEmployee}
                keyboardType="numeric"
              />
              <FormInput
                icon="store"
                placeholder="Sucursal"
                value={values.sucursal}
                onChangeText={handleChange('sucursal')}
                onBlur={() => handleBlur('sucursal')}
                error={errors.sucursal}
                touched={touched.sucursal}
              />
              <FormInput
                icon="mail"
                placeholder="Correo electrónico"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
              />
              <FormInput
                icon="lock"
                placeholder="Contraseña segura"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
              />
              <FormInput
                icon="lock"
                placeholder="Confirmar contraseña"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                secureTextEntry
              />
              <FormInput
                icon="location-on"
                placeholder="Código Postal"
                value={values.postalCode}
                onChangeText={handleChange('postalCode')}
                onBlur={() => handleBlur('postalCode')}
                error={errors.postalCode}
                touched={touched.postalCode}
                keyboardType="numeric"
              />
              <FormInput
                icon="phone"
                placeholder="Número de celular"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={() => handleBlur('phoneNumber')}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                keyboardType="phone-pad"
              />
              <View style={styles.checkboxContainer}>
                <CheckBox
                  center
                  title="Acepto los términos y condiciones"
                  checked={values.acceptedTerms}
                  onPress={() => setFieldValue('acceptedTerms', !values.acceptedTerms)}
                  containerStyle={styles.checkbox}
                />
              </View>
              {touched.acceptedTerms && errors.acceptedTerms && (
                <Text style={styles.warningText}>{errors.acceptedTerms}</Text>
              )}
              <Pressable
                onPress={() => handleSubmit()}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              >
                <Text style={styles.buttonText}>¡Registrate!</Text>
              </Pressable>
            </>
          )}
        </Formik>

        <View style={styles.optionsContainer}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.optionText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.blanco },
  scrollViewContent: { paddingHorizontal: 20, paddingVertical: 20 },
  titleApp: {
    fontSize: 32,
    fontFamily: 'Circular-std',
    color: Colors.primario,
    textAlign: 'center',
  },
  titleAppHighLight: { color: Colors.secundario },
  title: {
    fontSize: 24,
    fontFamily: 'Redhat-Bold',
    marginBottom: 20,
    color: Colors.negro,
    textAlign: 'center',
  },
  checkboxContainer: { marginTop: 10, marginBottom: 10 },
  checkbox: { backgroundColor: 'transparent' },
  button: {
    backgroundColor: Colors.primario,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { backgroundColor: Colors.secundarioLight, opacity: 0.8 },
  buttonText: { color: Colors.blanco, fontSize: 16, fontWeight: 'bold' },
  warningText: { color: 'red', fontSize: 12, marginTop: 5 },
  optionsContainer: { alignItems: 'center', marginTop: 20 },
  optionText: {
    fontFamily: 'Redhat-Bold',
    color: Colors.primario,
    fontSize: 14,
  },
});
