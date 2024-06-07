import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../constants/colors'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'


export default function PlaceDetails({ route }) {

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        // fetch the place from the database

    }, [selectedPlaceId]);

    function shoOnMapHandler(placeId) {
        // navigate to the map screen
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Image style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.adressContainer}>
                    <Text style={styles.address}>ADDRESS</Text>
                </View>
                <OutlinedButton icon="map" onPress={shoOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
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