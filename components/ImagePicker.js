import { Button, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Alert } from "react-native";

function ImagePicker() {
    const [cameraPersmissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPersmissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPersmissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Denied', 'You need to grant camera permission to use this app', [{ text: 'Okay' }]);
            return false;
        }

        if (cameraPersmissionInformation.status === PermissionStatus.GRANTED) {
            return true;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        console.log(image);
    }
    return (
        <View style={styles.container}>
            <View></View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});