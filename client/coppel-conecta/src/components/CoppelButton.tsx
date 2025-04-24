import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, ImageSourcePropType } from 'react-native';

interface CoppelButtonProps {
  onPress: () => void;
  imageSource: ImageSourcePropType;
  title?: string;
  subtitle?: string;
}

const CoppelButton: React.FC<CoppelButtonProps> = ({ onPress, imageSource, title, subtitle }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover" // <- IMPORTANTE
      >
        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 120,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start', // para alinear arriba
    alignItems: 'flex-start',
  },
  imageStyle: {
    borderRadius: 15,
    // Si la imagen sigue centrándose, intenta:
    // resizeMode: 'cover', // Esto a veces va aquí, aunque ya esté en el componente padre
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
  },
  textContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default CoppelButton;
