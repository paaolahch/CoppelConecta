import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

type FormInputProps = {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

export default function FormInput({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry = false,
  keyboardType = 'default',
}: FormInputProps) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      {touched && error && <Text style={styles.warningText}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gris,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  warningText: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: Colors.warning,
    fontSize: 14,
  },
});
