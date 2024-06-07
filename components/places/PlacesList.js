import { FlatList, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";


function PlacesList({ places = [] }) {

    const navigation = useNavigation();

    function selectPlaceHandler(placeId) {
        navigation.navigate('PlaceDetails', { placeId });
    }

    if (!places.length) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places found!</Text>
        </View>;
    }

    return <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />} />
}

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
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