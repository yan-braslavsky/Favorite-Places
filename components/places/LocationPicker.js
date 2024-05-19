import React, { useState } from 'react';
import { View } from 'react-native';
import OutlinedButton from '../ui/OutlinedButton';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync,useForegroundPermissions,PermissionStatus } from 'expo-location';
import { Alert } from 'react-native';


function LocationPicker(props) {
    const [location, setLocation] = useState(null);
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
        console.log(location);
        
    }

    function pickOnmapHandler(newLocation) {
        setLocation(newLocation);
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                <Text>No location chosen yet!</Text>
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
    }
});