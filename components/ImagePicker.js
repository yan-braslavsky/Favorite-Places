import { View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Alert } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import OutlinedButton from "./ui/OutlinedButton";

function ImagePicker({ onTakeImage}) {
    const [cameraPersmissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState(null);

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

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image picked yet</Text>;

    if (pickedImage) {
        console.log(pickedImage);
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    } else {
        console.log('No image');
    }

    return (
        <View >
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon={"camera"} onPress={takeImageHandler} >Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.primary500,
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 8,
        backgroundColor: Colors.primary100
    },
    image: {
        width: '100%',
        height: '100%'
    }
});