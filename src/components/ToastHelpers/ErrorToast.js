// src/components/ToastHelpers/ErrorToast.js
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorToast = ({ message }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/AnimatedIcons/ErrorAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                speed={1.5}
                style={styles.lottie}
            />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: 'white',  // Success color (green)
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        color: 'black',  // White text color
        fontWeight: 'bold',
    },
    lottie: {
        width: 32,
        height: 32,
    },
});

export default ErrorToast;
