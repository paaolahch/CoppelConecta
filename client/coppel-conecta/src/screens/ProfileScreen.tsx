import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CoppelButton from '../components/CoppelButton';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PropsMenu = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: PropsMenu) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER CON USUARIO Y MENÚ */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido, Alejandro</Text>
        <Pressable onPress={() => setMenuOpen(prev => !prev)} style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/user-avatar.png')}
            style={styles.avatar}
          />
          <Icon name={menuOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color={Colors.blanco} />
        </Pressable>
      </View>

      {menuOpen && (
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={() => alert('Ver perfil')}>
            <Icon name="person" size={20} color={Colors.primario} />
            <Text style={styles.menuText}>Mi perfil</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Admin')}>
            <Icon name="admin" size={20} color={Colors.primario} />
            <Text style={styles.menuText}>Administracion</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => alert('Cerrar sesión')}>
            <Icon name="logout" size={20} color={Colors.primario} />
            <Text style={styles.menuText}>Cerrar sesión</Text>
          </Pressable>
        </View>
      )}

      {/* CONTENIDO SCROLLABLE */}
      <ScrollView contentContainerStyle={styles.content}>
        <CoppelButton
          title="CoppelEmprende"
          subtitle="Registro de emprendedores"
          onPress={() => navigation.navigate('RegClient')}
          imageSource={require('../../assets/images/registro-emprendedor.jpg')}
        />

        <CoppelButton
          title="Tu ruta"
          subtitle="Avanzemos juntos"
          onPress={() => navigation.navigate('Routes')}
          imageSource={require('../../assets/images/rutas.jpg')}
        />

        <CoppelButton
          title="Mi compañero virtual"
          subtitle="¡Hola! Soy Coppely tu amigo y asesor"
          onPress={() => navigation.navigate('Chat')}
          imageSource={require('../../assets/images/asistente.jpg')}
        />

        <CoppelButton
          title="Preguntas frecuentes"
          subtitle="Resuelve todas tus dudas sobre el programa"
          onPress={() => navigation.navigate('Routes')}
          imageSource={require('../../assets/images/preguntas.png')}
        />

        <CoppelButton
          title="Recompensas y reconocimiento"
          subtitle="¡Es momento de premiar tu esfuerzo!"
          onPress={() => navigation.navigate('Rewards')}
          imageSource={require('../../assets/images/recompensas.png')}
        />

        <CoppelButton
          title="Configuración y ayuda"
          subtitle="Personalicemos tu experiencia"
          onPress={() => navigation.navigate('Routes')}
          imageSource={require('../../assets/images/config_ayuda.png')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primario,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.blanco,
    fontFamily: 'Redhat-Bold',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    zIndex: 10,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primario,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
});
