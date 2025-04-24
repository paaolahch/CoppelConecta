import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const ProgressScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seguimiento de referidos</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total negocios referidos</Text>
          <Text style={styles.cardValue}>12</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cursos en progreso</Text>
          <ProgressBar progress={0.45} color={Colors.primario} style={styles.progressBar} />
          <Text style={styles.progressLabel}>45% promedio</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cursos completados</Text>
          <ProgressBar progress={0.75} color={Colors.success} style={styles.progressBar} />
          <Text style={styles.progressLabel}>75% de los referidos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recompensas obtenidas</Text>
          <Text style={styles.cardValue}>3 premios desbloqueados</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <Text style={styles.sectionText}>
            Estás haciendo un gran trabajo ayudando a emprendedores a capacitarse. Sigue así y desbloquearás nuevas recompensas pronto.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blanco,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Redhat-Bold',
    color: Colors.primario,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Redhat-Bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    color: Colors.primario,
    fontFamily: 'Redhat-Bold',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.negro,
    fontFamily: 'Redhat-Regular',
  },
  section: {
    marginTop: 30,
    backgroundColor: '#eef3f9',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Redhat-Bold',
    marginBottom: 8,
    color: Colors.primario,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Redhat-Regular',
  },
});
