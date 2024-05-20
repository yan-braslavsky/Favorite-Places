import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import MapView, { Marker } from 'react-native-maps';


function Map() {

    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({
            lat: lat,
            lng: lng
        });
    }



    return <MapView style={styles.map} onPress={selectLocationHandler} initialRegion={region} >
        {selectedLocation && <Marker
            title='Picked Location'
            coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}
    </MapView>
}
export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});