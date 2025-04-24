import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import Logo from '../../assets/svgs/LogoHomeScreen.svg'
import { Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
        <Logo style={styles.logo}></Logo>
        <Text style={styles.title}>Coppel<Text style={styles.highlight}>Conecta</Text></Text>
        <Pressable
            onPress={() => navigation.navigate('Login')}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
            ]}
        >
            <Text style={styles.buttonText}>¡Comenzar!</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primario,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Colors.blanco,
        fontSize: 36,
        fontFamily: "Redhat-Bold" 
    },
    highlight: {
        color: Colors.secundario
    },
    logo: {
        marginBottom: 16,
    },
    button: {
        backgroundColor: Colors.secundario,
        marginTop: 18,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        opacity: 0.8, // o cambia a otro color si prefieres
        transform: [{ scale: 0.95 }],
    },
    buttonText: {
        color: Colors.negro,
        fontSize: 18,
        fontFamily: 'Redhat-Bold'
    }
})
