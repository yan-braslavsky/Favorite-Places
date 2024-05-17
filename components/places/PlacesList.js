import { FlatList, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";



function PlacesList({ places = [] }) {

    if (!places.length) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places found!</Text>
        </View>;
    }

    return <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} />} />
}

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 18,
        color: Colors.primary200
    }
});