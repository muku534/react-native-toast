// src/components/ToastHelpers/CustomToast.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomToast = ({ content }) => {
    return (
        <View style={styles.customToast}>
            <Text style={styles.text}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    customToast: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',  // White text color
        fontWeight: 'bold',
    },
});

export default CustomToast;
