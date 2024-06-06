import { useCallback, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "../ImagePicker";
import LocationPicker from "../places/LocationPicker";
import CustomButton from "../ui/CustomButton";
import {Place} from "../../models/Place";

function PlaceForm({ onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    function titleChangeHandler(changedString) {
        setEnteredTitle(changedString);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setSelectedLocation(location);
    }, []);


    function savePlaceHandler() {
        const data =  new Place(enteredTitle, selectedImage, selectedLocation);
        onCreatePlace(data);
    }

    return (
        <ScrollView style={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={titleChangeHandler} placeholder="Place Name" value={enteredTitle} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <CustomButton onPress={savePlaceHandler} >Add Place</CustomButton>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary700
    },
    input: {
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
});