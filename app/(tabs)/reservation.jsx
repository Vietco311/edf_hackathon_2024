import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export default function ReservationScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const route = useRoute();
    const [vehicle, setVehicle] = useState();
    const [cities, setCities] = useState([])

    useEffect(() => {
        const fetchVehicleById = async () => {
            try {
                const response = await axios.get(`https://20e7-78-242-95-9.ngrok-free.app/vehicule/${route.params.id}`);
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
                const response = await axios.get('https://20e7-78-242-95-9.ngrok-free.appp/destinations_possibles');
                console.log(response.data);
                setCities(response.data)
            }
            catch (err) {
                console.error('Error fetching cities:', error, response.data);
            }
        };
        fetchCities();
        fetchVehicleById();
    }, [route.params.id]);

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
            {vehicle && (
                <View style={styles.vehicleCard}>
                    <Text style={styles.value}>{vehicle.modele}</Text>
                    <Text style={styles.value}>{vehicle.immat}</Text>
                </View>
            )}
            <Text style={styles.subtitle}>Trajet:</Text>
            <View style={styles.trajetCard}>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={cities.map((city) => ({
                        label: city.Nom_destination,
                        value: city.id_destination
                    }))}
                    placeholder={{ label: "Sélectionnez une ville", value: null }}
                    style={{
                        inputIOS: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 4,
                            color: 'black',
                        },
                        inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    }
});