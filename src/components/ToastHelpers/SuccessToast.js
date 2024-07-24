import React from "react";
import { StyleSheet, View } from "react-native";

const SuccessToast = (message) => {
    <View style={[styles.toast, styles.success]}>
        <Text style={styles.text}>{message}</Text>
    </View>
}

const style = StyleSheet.create({
    toast: {
        padding: 10,
        borderRadius: 5,
    },
    success: {
        backgroundColor: '#4BB543',
    },
    text: {
        color: '#fff',
    }
});

export default SuccessToast;