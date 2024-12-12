import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function Caracteristique() {
  const [isHovered, setIsHovered] = useState(false);
  const navigation = useNavigation();
  
  const vehicle = {
    id: 1,
    marque: 'Renault',
    modele: 'Clio',
    immat: 'FD161BV',
    nb_place: 2,
    annee: 2020,
    couleur: 'Rouge',
    kilometrage: 15000,
    image: require('@/assets/images/edf-logo-2005.webp'), // Remplacez par le chemin de votre image
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image source={vehicle.image} style={styles.image} />
        <TouchableWithoutFeedback
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
        >
          <ThemedView style={[styles.details, isHovered && styles.hover]}>
            <ThemedText style={styles.item}>Marque: {vehicle.marque}</ThemedText>
            <ThemedText style={styles.item}>Modèle: {vehicle.modele}</ThemedText>
            <ThemedText style={styles.item}>Immatriculation: {vehicle.immat}</ThemedText>
            <ThemedText style={styles.item}>Places: {vehicle.nb_place}</ThemedText>
            <ThemedText style={styles.item}>Année: {vehicle.annee}</ThemedText>
            <ThemedText style={styles.item}>Kilométrage: {vehicle.kilometrage} km</ThemedText>
          </ThemedView>
        </TouchableWithoutFeedback>
        <TouchableOpacity 
          style={styles.reserver} 
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('reservation', {
              id: vehicle.id
            });
          }}
        >
          <ThemedText>Réserver</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  details: {
    backgroundColor: '#1057C8',
    padding: 16,
    marginTop: 16,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  hover: {
    backgroundColor: '#0A47A1',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  reserver: {
    fontSize: 16,
    marginRight: 8,
    backgroundColor: '#001A70', 
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
});