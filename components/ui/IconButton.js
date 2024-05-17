import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'


function IconButton({ iconName, size, color, onPress }) {

    return <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.7,
    },
});