import { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "../ImagePicker";

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');

    function titleChangeHandler(enteredTitle) {
        setEnteredTitle(enteredTitle);
    }

    return (
        <ScrollView style={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChange={titleChangeHandler} placeholder="Place Name" value={enteredTitle} />
            </View>
            <ImagePicker />
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