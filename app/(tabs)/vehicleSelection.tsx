import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Pour prendre une photo avec Expo
import { useRouter } from 'expo-router';

export default function VehicleSelection() {
  const router = useRouter();
  const [licensePlate, setLicensePlate] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  const handleTextSearch = () => {
    if (licensePlate) {
      // Naviguer vers VehicleDetails avec la plaque d'immatriculation
      router.push('/(tabs)/vehicleDetails');
    } else {
      Alert.alert('Veuillez saisir une plaque d\'immatriculation');
    }
  };

  const handlePhotoSearch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      Alert.alert('Photo prise', 'Plaque capturée, traitée pour la reconnaissance');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionner un Véhicule</Text>

      <Text style={styles.texte}>Recherche par matricule</Text>
      <TextInput
        style={styles.input}
        placeholder="Saisir la plaque d'immatriculation"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTextSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePhotoSearch}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  texte: {
    fontSize: 15,
    paddingBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Espace entre les boutons
  },
  button: {
    flex: 1,
    backgroundColor: '#A1CEDC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5, // Espacement horizontal entre les boutons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});