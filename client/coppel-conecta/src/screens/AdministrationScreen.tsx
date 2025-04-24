import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const mockCobradores = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    negociosVisitados: 15,
    referidos: 7,
    cursosRecomendados: 10,
  },
  {
    id: '2',
    nombre: 'Ana García',
    negociosVisitados: 12,
    referidos: 5,
    cursosRecomendados: 9,
  },
  {
    id: '3',
    nombre: 'Carlos Díaz',
    negociosVisitados: 20,
    referidos: 10,
    cursosRecomendados: 12,
  },
];

export default function AdministracionScreen() {
  const totalVisitados = mockCobradores.reduce((acc, item) => acc + item.negociosVisitados, 0);
  const totalReferidos = mockCobradores.reduce((acc, item) => acc + item.referidos, 0);
  const totalCursos = mockCobradores.reduce((acc, item) => acc + item.cursosRecomendados, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Total negocios visitados: {totalVisitados}</Text>
        <Text style={styles.summaryText}>Total referidos: {totalReferidos}</Text>
        <Text style={styles.summaryText}>Total cursos recomendados: {totalCursos}</Text>
      </View>

      <FlatList
        data={mockCobradores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.detail}>Negocios visitados: {item.negociosVisitados}</Text>
            <Text style={styles.detail}>Referidos: {item.referidos}</Text>
            <Text style={styles.detail}>Cursos recomendados: {item.cursosRecomendados}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Redhat-Bold',
    color: Colors.primario,
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: Colors.secundarioLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.negro,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Redhat-Bold',
    color: Colors.primario,
  },
  detail: {
    fontSize: 14,
    color: Colors.negro,
  },
});
