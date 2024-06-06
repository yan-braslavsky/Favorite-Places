import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/places/PlaceForm';

function AddPlace({ navigation}) {
    function createPlaceHandler(place) {
        navigation.navigate('AllPlaces',{
            place: place
        });
    }
    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
}

export default AddPlace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});