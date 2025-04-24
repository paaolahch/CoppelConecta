import React from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header fijo con nombre del bot */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Coppely</Text>
        <Text style={styles.subheaderText}>Tu asesor virtual</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={[]} // sin mensajes todavía
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => null}
          contentContainerStyle={styles.chatBody}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#888"
          />
          <Pressable style={styles.sendButton}>
            <Text style={styles.sendText}>Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blanco,
  },
  header: {
    backgroundColor: Colors.primario,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: Colors.blanco,
    fontSize: 24,
    fontFamily: 'Redhat-Bold',
  },
  subheaderText: {
    color: Colors.blanco,
    fontSize: 16,
    fontFamily: 'Redhat-Regular',
    marginTop: 4,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  chatBody: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.blanco,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f2f2f2',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Redhat-Regular',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: Colors.primario,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
  },
  sendText: {
    color: Colors.blanco,
    fontFamily: 'Redhat-Bold',
    fontSize: 16,
  },
});
