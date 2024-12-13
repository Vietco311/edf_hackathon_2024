import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function VehicleDetails() {

  const route = useRoute();

  const [licensePlate, setLicensePlate] = useState(); // Récupérer le paramètre 'licensePlate'

  const fetchVehicleDetails = async () => {
    try{
      const response = await axios.get(`https://20e7-78-242-95-9.ngrok-free.app/vehicule/${route.params.vehicleId}`);
      console.log(response.data);
      setLicensePlate(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVehicleDetails();
  }, []);
    

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
              <Text style={styles.label}>Plaque d'immatriculation :</Text> {licensePlate.immat}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Modèle :</Text> {licensePlate.modele}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Propulsion :</Text> {licensePlate.propulsion}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Nombre de places :</Text> {licensePlate.nb_places}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Autonomie théorique :</Text> {licensePlate.autonomie_theorique} Km
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Taille batterie :</Text> {licensePlate.Taille_batterie} Ah
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Consommation kwh 100km :</Text> {licensePlate.Conso_kwh_100km} Kwh
            </Text>
            <Text style={styles.info}>
              <Text style={styles.label}>Consommation lt 100km :</Text> {licensePlate.Conso_lt_100km} Litre(s)
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
