// src/components/ToastHelpers/ErrorToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorToast = (message) => (
    <View style={[styles.toast, styles.error]}>
        <Text style={styles.text}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    toast: {
        padding: 10,
        borderRadius: 5,
    },
    error: {
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
});

export default ErrorToast;
