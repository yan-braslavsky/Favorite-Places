import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../util/database';

function AddPlace({ navigation}) {
    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('AllPlaces');
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