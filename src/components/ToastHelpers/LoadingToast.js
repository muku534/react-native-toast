// src/components/ToastHelpers/LoadingToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingToast = ({ message }) => {
    return (
        <View style={[styles.toast, styles.loading]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    toast: {
        padding: 10,
        borderRadius: 5,
    },
    loading: {
        backgroundColor: 'orange',
    },
    text: {
        color: 'white',
    },
});

export default LoadingToast;
