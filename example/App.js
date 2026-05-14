/**
 * rn-toastify v2.0 — Example / Demo App
 *
 * To test this, create a new React Native project:
 *   npx react-native init ToastDemo
 *   cd ToastDemo
 *   npm install react-native-reanimated
 *
 * Then copy this file as App.js and copy/link the rn-toastify package.
 */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';

// In a real app: import useToast, { ToastContainer } from 'rn-toastify';
const useToast = require('./index');
const { ToastContainer } = require('./index');

const BUTTON_DATA = [
    {
        label: '✅  Success Toast',
        color: '#10B981',
        action: (toast) =>
            toast.success('Your changes have been saved successfully.', {
                title: 'Success!',
                duration: 3500,
            }),
    },
    {
        label: '❌  Error Toast',
        color: '#EF4444',
        action: (toast) =>
            toast.error('Failed to save your changes. Please try again.', {
                title: 'Something went wrong',
                duration: 4000,
            }),
    },
    {
        label: 'ℹ️  Info Toast',
        color: '#3B82F6',
        action: (toast) =>
            toast.info('Version 2.0 is now available for download.', {
                title: 'Update Available',
                duration: 3500,
            }),
    },
    {
        label: '⚠️  Warning Toast',
        color: '#F59E0B',
        action: (toast) =>
            toast.warning('Only 2 GB of storage remaining on your device.', {
                title: 'Low Storage',
                duration: 3500,
            }),
    },
    {
        label: '⏳  Loading Toast',
        color: '#6366F1',
        action: (toast) => {
            const id = toast.show(
                React.createElement(
                    require('./src/components/LoadingToast').default,
                    { message: 'Processing your request...' }
                ),
                { duration: Infinity }
            );
            setTimeout(() => toast.dismiss(id), 3000);
        },
    },
    {
        label: '🎉  Emoji Toast',
        color: '#8B5CF6',
        action: (toast) =>
            toast.emoji('You completed the onboarding tutorial!', '🎉', {
                title: 'Achievement Unlocked',
                duration: 4000,
            }),
    },
    {
        label: '🔄  Promise Toast',
        color: '#EC4899',
        action: (toast) => {
            const fakePromise = new Promise((resolve) =>
                setTimeout(() => resolve({ name: 'Mukesh' }), 2000)
            );
            toast.promise(fakePromise, {
                loading: 'Saving your profile...',
                success: 'Profile saved successfully!',
                error: 'Failed to save profile.',
            });
        },
    },
    {
        label: '📌  Message Only (no title)',
        color: '#6B7280',
        action: (toast) =>
            toast.success('This toast has no title — just a message.', {
                duration: 3000,
            }),
    },
    {
        label: '⬇️  Bottom Position',
        color: '#0EA5E9',
        action: (toast) =>
            toast.info('This appears at the bottom!', {
                title: 'Bottom Toast',
                position: 'bottom',
                duration: 3000,
            }),
    },
    {
        label: '🧹  Dismiss All',
        color: '#374151',
        action: (toast) => toast.dismissAll(),
    },
];

const ExampleApp = () => {
    const toast = useToast();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safe}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.heading}>🍞 rn-toastify</Text>
                    <Text style={styles.subheading}>v2.0 — Demo</Text>
                    <View style={styles.grid}>
                        {BUTTON_DATA.map((btn, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[styles.button, { backgroundColor: btn.color }]}
                                activeOpacity={0.8}
                                onPress={() => btn.action(toast)}
                            >
                                <Text style={styles.buttonText}>{btn.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <ToastContainer theme="light" maxVisible={3} />
        </>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 40,
    },
    heading: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
    },
    subheading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 32,
    },
    grid: {
        gap: 12,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default ExampleApp;
