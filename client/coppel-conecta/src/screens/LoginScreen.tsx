import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePassworValidation from '../hooks/usePassworValidation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useNumEmployeeValidation from '../hooks/useNumEmployeeValidation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loginWithEmployeeNum } from '../services/authServices';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const {
    numEmployee,
    isNumberValid,
    isValidLength,
    handleNumEmployeeChange
  } = useNumEmployeeValidation();

  const {
    password,
    isValid: isPasswordValid,
    handlePasswordChange
  } = usePassworValidation();

  const handleLogin = async () => {
    if (!numEmployee || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      console.log('Iniciando sesión con', numEmployee, password);
      const uid = await loginWithEmployeeNum(numEmployee, password);
      console.log('UID:', uid);
      navigation.navigate('Profile');
    } catch (error: any) {
      Alert.alert('Error al iniciar sesión', error.message || 'Algo salió mal');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleApp}>
          Coppel<Text style={styles.titleAppHighLight}>Conecta</Text>
        </Text>

        <Text style={styles.title}>Inicia Sesión</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>No. de empleado</Text>
          <View style={styles.inputWrapper}>
            <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={numEmployee}
              onChangeText={handleNumEmployeeChange}
              keyboardType="number-pad"
              autoCapitalize="none"
              placeholder="Ej: 04080906776"
            />
          </View>
        </View>

        {numEmployee !== '' && (
          <>
            {isNumberValid === false && (
              <View style={styles.validationContainer}>
                <Icon name="close" size={16} color={Colors.warning} style={styles.icon} />
                <Text style={styles.validationText}>Solo debe de ingresar números</Text>
              </View>
            )}
            {isNumberValid === true && (
              <View style={styles.validationContainer}>
                <Icon name="check-circle" size={16} color={Colors.success} style={styles.icon} />
                <Text style={[styles.validationText, { color: Colors.success }]}>Debe de contener solo números</Text>
              </View>
            )}
            {isValidLength === false && (
              <View style={styles.validationContainer}>
                <Icon name="close" size={16} color={Colors.warning} style={styles.icon} />
                <Text style={styles.validationText}>Tu número debe tener 6 caracteres</Text>
              </View>
            )}
            {isValidLength === true && (
              <View style={styles.validationContainer}>
                <Icon name="check-circle" size={16} color={Colors.success} style={styles.icon} />
                <Text style={[styles.validationText, { color: Colors.success }]}>Número de empleado válido</Text>
              </View>
            )}
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              placeholder="Tu contraseña"
            />
          </View>
        </View>

        {password !== '' && (
          <>
            {isPasswordValid === false && (
              <View style={styles.validationContainer}>
                <Icon name="close" size={16} color={Colors.warning} style={styles.icon} />
                <Text style={styles.validationText}>Necesitas ingresar una contraseña segura</Text>
              </View>
            )}
            {isPasswordValid === true && (
              <View style={styles.validationContainer}>
                <Icon name="check-circle" size={16} color={Colors.success} style={styles.icon} />
                <Text style={[styles.validationText, { color: Colors.success }]}>Contraseña válida</Text>
              </View>
            )}
          </>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.optionText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Navegar a la pantalla de olvido de contraseña')}>
            <Text style={styles.optionText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
    paddingHorizontal: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  titleApp: {
    fontSize: 34,
    color: Colors.primario,
    fontFamily: 'Redhat-Bold',
    marginBottom: 20,
  },
  titleAppHighLight: {
    color: Colors.secundario,
  },
  title: {
    fontSize: 24,
    color: Colors.negro,
    fontFamily: 'Redhat-Bold',
    marginBottom: 40,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
    textAlign: 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primario,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.blanco
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.gris,
    height: 48,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.secundario,
    marginTop: 18,
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
    opacity: 0.8, // o cambia a otro color si prefieres
    transform: [{ scale: 0.95 }],
},
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -8,
  },
  validationText: {
    fontSize: 14,
    color: Colors.warning,
    fontFamily: 'Redhat-Regular',
  },
  icon: {
    marginRight: 4,
  },
  optionsContainer: {
    marginTop: 20, 
    alignItems: 'center',
},
    optionText: {
        fontSize: 16,
        color: Colors.primario,
        marginTop: 8,
        marginBottom: 6,
        fontFamily: 'Redhat-Bold'
    },
});
