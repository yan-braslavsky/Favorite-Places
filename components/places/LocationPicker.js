import React, { useState } from 'react';
import { View } from 'react-native';
import OutlinedButton from '../ui/OutlinedButton';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { Alert } from 'react-native';
import { getMapPreview } from '../../util/location';
import { Image } from 'react-native';


function LocationPicker(props) {
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Denied', 'You need to grant location permission to use this app', [{ text: 'Okay' }]);
            return false;
        }

        if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
            return true;
        }

        return true;
    }

    async function getLocationHandler(newLocation) {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

    }

    function pickOnmapHandler(newLocation) {
        setPickedLocation(newLocation);
    }

    let locationPreview = <Text>No location chosen yet!</Text>

    if (pickedLocation) {
        locationPreview = <Image style={styles.mapPreviewImage} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} style={styles.mapPreview} />
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}

            </View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon={"location"}>Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnmapHandler} icon={"map"}>Pick On Map</OutlinedButton>
            </View>
        </View>);

}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        borderColor: Colors.primary500,
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%'
    }
});