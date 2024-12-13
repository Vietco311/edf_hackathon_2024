import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function VehicleMileage() {
  const [mileage, setMileage] = useState('');

  // Fonction pour enregistrer le kilométrage saisi
  const handleSaveMileage = () => {
    if (!mileage) {
      Alert.alert('Veuillez saisir un kilométrage.');
      return;
    }
    Alert.alert('Succès', `Kilométrage enregistré : ${mileage} km`);
  };

  // Fonction pour prendre une photo du cadran
  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      Alert.alert('Photo prise', 'Image capturée avec succès.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relever le Kilométrage</Text>

      <View style={styles.optionContainer}>
        {/* Option 1: Saisie du kilométrage */}
        <Text style={styles.label}>Saisir le kilométrage</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le kilométrage"
          keyboardType="numeric"
          value={mileage}
          onChangeText={setMileage}
        />
      </View>

      <View style={styles.optionContainer}>
        {/* Option 2: Prendre une photo */}
        <Text style={styles.label}>Ou prendre une photo du cadran</Text>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveMileage}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
