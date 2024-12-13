import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { StyleSheet, View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Pour prendre une photo avec Expo
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import { Animated } from 'react-native';

const fuseOptions = {
  keys: ['immat'],
  threshold: 0.3,
  includeScore: true
};

export default function VehicleSelection() {
  const router = useRouter();
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [containerAnimation] = useState(new Animated.Value(0));

  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();
  const fuse = new Fuse(vehicles, fuseOptions);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('https://a57c-78-242-87-107.ngrok-free.app/database_voitures');
        setVehicles(response.data)
      }
      catch (error) {
        console.error('Failed to fetch vehicles:', error);
        Alert.alert('Error', 'Unable to fetch vehicle data. Please try again later.');
      }
    }
    fetchVehicles()
  }, [])

  const animateContainer = (toValue) => {
    Animated.spring(containerAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  };
  
  const containerStyle = {
    ...styles.container,
    transform: [{
      translateY: containerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -200] // Move up 200 units when searching
      })
    }],
    opacity: containerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95]
    })
  };

  useEffect(() => {
    animateContainer(showDropdown ? 1 : 0);
  }, [showDropdown]);

  const handleToDetails = (vehicleImmat) => {
    if (licensePlate) {
      // Naviguer vers VehicleDetails avec la plaque d'immatriculation
      navigation.navigate('vehicleDetails', { vehicleImmat });
    } else {
      Alert.alert('Veuillez saisir une plaque d\'immatriculation');
    }
  };

  const handleSearch = (text) => {
    setLicensePlate(text);
    if (text && text.length > 0) {
      const results = fuse.search(text);
      setSearchResults(results.map(result => result.item));
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handlePhotoSearch = async () => {
    const permissionStatus = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permissionStatus);
    if (!permissionStatus.granted) {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la caméra pour continuer');
      return;
    }
    else {
      try {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          base64: true,
        });
        console.log(result);
  
        if (!result.canceled) {
          Alert.alert('Photo prise', 'Plaque capturée, traitée pour la reconnaissance');
        }
        
        try {
          const reponse = await axios.post('https://a57c-78-242-87-107.ngrok-free.app/upload_file', {
            file: result
          }, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          setLicensePlate(reponse.data);
          console.log(reponse);
        }
        catch (e) {
          console.log(e);
        }
  
      }
      catch (e) {
        console.log(e);
      }
    }
    
  };

  return (
    <Animated.View style={containerStyle}>
      <Text style={styles.title}>Sélectionner un Véhicule</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.texte}>Rechercher par immatriculation</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir la plaque d'immatriculation"
          value={licensePlate}
          onChangeText={(text) => handleSearch(text)}
        />

        {showDropdown && vehicles && (
          <View style={styles.dropdown}>
            {searchResults && searchResults.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.immat}
                style={styles.dropdownItem}
                onPress={() => handleToDetails(vehicle.immat)}
              >
                <Text style={styles.dropdownText}>{vehicle.immat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePhotoSearch}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#0033A0', // EDF blue
  },
  texte: {
    fontSize: 15,
    paddingBottom: 10,
    color: '#0033A0', // EDF blue
  },
  input: {
    height: 40,
    borderColor: '#0033A0', // EDF blue
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between buttons
  },
  button: {
    flex: 1,
    backgroundColor: '#FF6900', // EDF orange
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5, // Horizontal spacing between buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0033A0', // EDF blue
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0033A0', // EDF blue
  },
  dropdownText: {
    color: '#0033A0', // EDF blue
  },
});