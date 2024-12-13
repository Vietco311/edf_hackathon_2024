import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function VehicleDetails() {

  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [licensePlate, setLicensePlate] = useState(); // Récupérer le paramètre 'licensePlate'

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(`https://a57c-78-242-87-107.ngrok-free.app/vehicule/immat/${route.params.vehicleImmat}`);
      console.log(response.data);
      setLoading(false);
      setLicensePlate(response.data);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
                <Text style={styles.label}>Plaque d'immatriculation :</Text> {licensePlate.immat || "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Modèle :</Text> {licensePlate.modele || "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Propulsion :</Text> {licensePlate.propulsion || "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Nombre de places :</Text> {licensePlate.nb_places ? `${licensePlate.nb_places} places` : "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Autonomie théorique :</Text> {licensePlate.autonomie_theorique ? `${licensePlate.autonomie_theorique} Km` : "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Taille batterie :</Text> {licensePlate.Taille_batterie ? `${licensePlate.Taille_batterie} Ah` : "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Consommation kwh 100km :</Text> {licensePlate.Conso_kwh_100km ? `${licensePlate.Conso_kwh_100km} Kwh` : "Non renseigné"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Consommation lt 100km :</Text> {licensePlate.Conso_lt_100km ? `${licensePlate.Conso_lt_100km} Litre(s)` : "Non renseigné"}
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
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    color: '#005BAC'
  },
  imageVehicule: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
  detailsContainer: {
    width: '90%', // Set width relative to parent
    marginHorizontal: 'auto', // Center horizontally
    backgroundColor: '#FF6900',
    borderRadius: 10,
    padding: 10,
    marginTop: 20, // Add some spacing from image
  },
  info: {
    fontSize: 20,
    marginBottom: 10, // Espacement entre les lignes
  },
  label: {
    fontWeight: 'bold', // Mettre en gras les labels
  },
});
