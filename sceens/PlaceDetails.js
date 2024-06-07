import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../constants/colors'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { fetchPlaceDetails } from '../util/database'
import { useState } from 'react'


export default function PlaceDetails({ route, navigation }) {

    const selectedPlaceId = route.params.placeId;
    const [place, setPlace] = useState();

    useEffect(() => {
        // fetch the place from the database
        async function loadPlaceData() {
            const fetchedPlace = await fetchPlaceDetails(selectedPlaceId);
            console.log("fetchedPlace",fetchedPlace);
            setPlace(fetchedPlace);
            navigation.setOptions({ title: fetchedPlace.title });
        }

        loadPlaceData();

    }, [selectedPlaceId]);

    function shoOnMapHandler() {
        // navigate to the map screen
    }

    if (!place) {
        return (
            <View style={styles.fallbakContainer}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Image style={styles.image} source={{ uri: place.imageUri }} />
            <View style={styles.locationContainer}>
                <View style={styles.adressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={shoOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    fallbakContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '35%',
        minheight: 300
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    adressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontStyle: 'bold',
        fontweight: 'bold',
        fontSize: 16
    }
});