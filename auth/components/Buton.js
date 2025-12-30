import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export default function Button({ children, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
            <View>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
