import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function VehicleDefects() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri); // Utiliser assets[0].uri pour récupérer l'URI
      Alert.alert('Photo ajoutée', 'L\'image a été capturée avec succès.');
    }
  };

  const handleSubmit = () => {
    if (!category || !description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    Alert.alert('Succès', `Catégorie : ${category}\nDescription : ${description}`);
    // Réinitialiser les champs après soumission
    setCategory('');
    setDescription('');
    setPhotoUri(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Ajout du ScrollView */}
      <Text style={styles.title}>Relever les Défauts du Véhicule</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionner une catégorie </Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choisir une catégorie" value="" />
          <Picker.Item label="Essuie-glaces" value="essuie-glaces" />
          <Picker.Item label="Vitres" value="vitres" />
          <Picker.Item label="Pneus" value="pneus" />
          <Picker.Item label="Mécanique" value="mecanique" />
          <Picker.Item label="Eclairage" value="eclairage" />
          <Picker.Item label="Manque équipement" value="manque-equipement" />
          <Picker.Item label="Autonomie" value="autonomie" />
          <Picker.Item label="Autre" value="autre" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description du défaut</Text>
        <TextInput
          style={styles.input}
          placeholder="Décrire le défaut"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ajouter une photo</Text>
        {photoUri && <Image source={{ uri: photoUri }} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.button} onPress={handleAddPhoto}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Soumettre</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: "#005BAC"
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  input: {
    height: 100,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top', // Alignement du texte en haut
  },
  button: {
    backgroundColor: '#FF6900',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FF6900',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});
