// src/components/ToastHelpers/CustomToast.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomToast = (content) => (
    <View style={styles.customToast}>
        {content}
    </View>
);

const styles = StyleSheet.create({
    customToast: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomToast;
