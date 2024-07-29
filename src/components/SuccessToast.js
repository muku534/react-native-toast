import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessToast = ({ message }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/AnimatedIcons/SuccessAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                style={styles.lottie}
                speed={1.5}
            />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 2,
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

export default SuccessToast;
