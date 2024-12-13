import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFF', dark: '#1D3D47' }} 
      headerImage={
        <Image
          source={require('@/assets/images/logo-edf.png')} 
          style={styles.edfLogo} 
          resizeMode="contain"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Gestion des véhicules EDF</ThemedText>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('vehicleSelection')}>
          <Text style={styles.buttonText}>Sélectionner un Véhicule</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#005BAC', // EDF blue color
  },
  edfLogo: {
    height: 80, 
    width: 120, 
    top: 30, 
    left: 20, 
    position: 'absolute', 

  },
  buttonContainer: {
    marginTop: 30, 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#FF6900', // EDF orange color
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 30, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});
