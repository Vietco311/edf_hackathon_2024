import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {HelloWave} from '@/components/HelloWave';
import { useNavigation, useRouter } from 'expo-router';

export default function HomeScreen() {
    const navigation = useNavigation();
   
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} 
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
          <Text style={styles.buttonText}>Selectionner un Véhicule</Text>
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
    gap: 8, 
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
  edfLogo: {
    height: 250, 
    width: 350, 
    bottom: 0, 
    left: 0, 
    position: 'absolute', 
  },
  buttonContainer: {
    marginTop: 20, 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#A1CEDC', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 25, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});
