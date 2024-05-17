import { Pressable, View } from "react-native";
import { Image, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";


function PlaceItem({ place: { imageUri, title, address }, onSelect }) {
    return <Pressable onPress={onSelect}>
        <View>
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
            <Text>{title}</Text>
            <Text>{address}</Text>
        </View>
    </Pressable>;
}

export default PlaceItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});