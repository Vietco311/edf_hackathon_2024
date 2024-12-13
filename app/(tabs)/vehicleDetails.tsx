import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function VehicleDetails() {
  const { licensePlate } = useLocalSearchParams(); // Récupérer le paramètre 'licensePlate'

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Détails du Véhicule</Text>
        {licensePlate ? (
          <>
            <Image
              source={require('@/assets/images/voiture-test.jpg')}
              style={styles.imageVehicule}
              resizeMode="contain"
            />
            <View style={styles.detailsContainer}>
            <Text style={styles.info}>
              <Text style={styles.label}>Plaque d'immatriculation :</Text> {licensePlate}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Modèle :</Text> Peugeuot E-208
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Propulsion :</Text> Electrique
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Nombre de places :</Text> 5
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Autonomie théorique :</Text> 640 Km
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Taille batterie :</Text> 51 Ah
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Consommation kwh 100km :</Text> 18 Kwh
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Consommation lt 100km :</Text> 7 Litre(s)
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Défauts signalés :</Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula dui, mollis a viverra accumsan, mollis eget ante
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Site de rattachement :</Text> Ajaccio
            </Text>
          </View>
          </>
        ) : (
          <Text style={styles.info}>Aucune plaque fournie.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Permet à ScrollView d'occuper tout l'espace
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageVehicule: {
    width: 350,
    height: 250,
    marginBottom: 20,
  },
  detailsContainer: {
    alignSelf: 'flex-start', // Aligner le contenu à gauche
    paddingHorizontal: 16, // Ajout de marges horizontales pour l'esthétique
  },
  info: {
    fontSize: 20,
    marginBottom: 10, // Espacement entre les lignes
  },
  label: {
    fontWeight: 'bold', // Mettre en gras les labels
  },
});
