import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessToast = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',  // Success color (green)
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',  // White text color
        fontWeight: 'bold',
    },
});

export default SuccessToast;
