import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const fuseOptionsImmat = {
    keys: ['immat'],
    threshold: 0.3,
    includeScore: true
};

const fuseOptionsCities = {
    keys: ['Nom_destination'],
    threshold: 0.3,
    includeScore: true
};

export default function ReservationScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const route = useRoute();
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState();
    const [cities, setCities] = useState([]);
    const [cityA, setCityA] = useState('');
    const [cityB, setCityB] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [searchResultsCityA, setSearchResultsCityA] = useState([]);
    const [searchResultsCityB, setSearchResultsCityB] = useState([]);
    const [searchResultsVehicle, setSearchResultsVehicle] = useState([]);
    const [showDropdownV, setShowDropdownV] = useState(false);
    const [showDropdownA, setShowDropdownA] = useState(false);
    const [showDropdownB, setShowDropdownB] = useState(false);
    const fuseV = new Fuse(vehicles, fuseOptionsImmat);
    const fuseC = new Fuse(cities, fuseOptionsCities);

    const handleSaveMileage = () => {
        Alert.alert('Succès', `Réservation effectuée pour le véhicule ${licensePlate} de ${cityA} à ${cityB}`);
    };

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
        const fetchVehicleById = async () => {
            try {
                const response = await axios.get(`https://a57c-78-242-87-107.ngrok-free.app/vehicule/${route.params.id}`);
                try {
                    // If response.data is already an object, use it directly
                    const vehicleData = typeof response.data === 'string'
                        ? JSON.parse(response.data)
                        : response.data;
                    console.log(vehicleData)
                    setVehicle(vehicleData);
                } catch (error) {
                    console.error('Error parsing vehicle data:', error, response.data);
                    // Handle error appropriately
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }

        };
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://a57c-78-242-87-107.ngrok-free.app/destinations_possibles');
                console.log(response.data);
                setCities(response.data)
            }
            catch (err) {
                console.error('Error fetching cities:', error, response.data);
            }
        };
        fetchCities();
        console.log(cities)
        fetchVehicles()
        setLoading(false);
    }, []);

    const handleSearchVehicle = (text) => {
        setLicensePlate(text);
        if (text && text.length > 0) {
            const results = fuseV.search(text);
            setSearchResultsVehicle(results.map(result => result.item));
            setShowDropdownV(true);
        } else {
            setSearchResultsVehicle([]);
            setShowDropdownV(false);
        }
    };

    const handleSearchCityB = (text) => {
        setCityB(text);
        if (text && text.length > 0) {
            const results = fuseC.search(text);
            setSearchResultsCityB(results.map(result => result.item));
            setShowDropdownB(true);
        } else {
            setSearchResultsVehicle([]);
            setShowDropdownB(false);
        }
    };

    const handleSearchCityA = (text) => {
        setCityA(text);
        if (text && text.length > 0) {
            const results = fuseC.search(text);
            setSearchResultsCityA(results.map(result => result.item));
            console.log(searchResultsCityA);
            setShowDropdownA(true);
        } else {
            setSearchResultsVehicle([]);
            setShowDropdownA(false);
        }
    };


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Organiser le trajet</Text>
            <Text style={styles.subtitle}>Véhicule:</Text>
            <View style={styles.searchContainer}>
                <Text style={styles.texte}>Rechercher par immatriculation</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Saisir la plaque d'immatriculation"
                    value={licensePlate}
                    onChangeText={(text) => handleSearchVehicle(text)}
                />

                {showDropdownV && vehicles && (
                    <View style={styles.dropdown}>
                        {searchResultsVehicle && searchResultsVehicle.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.immat}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLicensePlate(vehicle.immat);
                                    setShowDropdownV(false);
                                    setSearchResultsVehicle([]);
                                }}
                            >
                                <Text style={styles.dropdownText}>{vehicle.immat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
            <Text style={styles.subtitle}>Trajet:</Text>
            <View style={styles.trajetCard}>
                <View style={styles.searchContainer}>
                    <Text style={styles.texte}>Rechercher la ville de départ</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Saisir la ville"
                        value={cityA}
                        onChangeText={(text) => handleSearchCityA(text)}
                    />

                    {showDropdownA && cities && (
                        <View style={styles.dropdown}>
                            {searchResultsCityA && searchResultsCityA.map((city) => (
                                <TouchableOpacity
                                    key={city.id_destination}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setCityA(city.Nom_destination);
                                        setShowDropdownA(false);
                                        setSearchResultsCityA([]);
                                    }}
                                >
                                    <Text style={styles.dropdownText}>{city.Nom_destination}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.searchContainer}>
                    <Text style={styles.texte}>Rechercher la ville d'arrivée</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Saisir la ville"
                        value={cityB}
                        onChangeText={(text) => handleSearchCityB(text)}
                    />

                    {showDropdownB && cities && (
                        <View style={styles.dropdown}>
                            {searchResultsCityB && searchResultsCityB.map((city) => (
                                <TouchableOpacity
                                    key={city.id_destination}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setCityB(city.Nom_destination);
                                        setShowDropdownB(false);
                                        setSearchResultsCityB([]);
                                    }}
                                >
                                    <Text style={styles.dropdownText}>{city.Nom_destination}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSaveMileage}>
                <Text style={styles.buttonText}>Réserver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    vehicleCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#0033A0', // EDF blue
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderColor: '#0033A0', // EDF blue
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        position: 'absolute',
        zIndex: 1,
        top: 50,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#0033A0', // EDF blue
    },
    dropdownText: {
        color: '#0033A0', // EDF blue
    },
    button: {
        backgroundColor: '#FF6900',
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