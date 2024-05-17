import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/places/PlaceForm';

function AddPlace() {
    return (
        <PlaceForm />
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