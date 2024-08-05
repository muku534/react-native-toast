import React from 'react';
import { render, act } from '@testing-library/react-native';
import Toast from '../Toast'; // Adjust the import path as needed

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Mock for animated

describe('Toast Component', () => {
    jest.useFakeTimers();

    it('should render and show toast', () => {
        const { getByText } = render(
            <Toast visible={true} duration={2000} position="bottom">
                Test Toast
            </Toast>
        );

        expect(getByText('Test Toast')).toBeTruthy();
    });

    it('should hide toast after duration', () => {
        const onHideMock = jest.fn();

        const { queryByText } = render(
            <Toast visible={true} duration={2000} position="bottom" onHide={onHideMock}>
                Test Toast
            </Toast>
        );

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(queryByText('Test Toast')).toBeNull();
        expect(onHideMock).toHaveBeenCalled();
    });

    it('should apply correct styles based on position', () => {
        const { getByText, rerender } = render(
            <Toast visible={true} duration={2000} position="top">
                Test Toast
            </Toast>
        );

        expect(getByText('Test Toast').parent.parent.props.style).toContainEqual({ top: 0 });

        rerender(
            <Toast visible={true} duration={2000} position="bottom">
                Test Toast
            </Toast>
        );

        expect(getByText('Test Toast').parent.parent.props.style).toContainEqual({ bottom: 50 });
    });
});
