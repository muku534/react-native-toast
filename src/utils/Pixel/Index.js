import { Dimensions, PixelRatio } from 'react-native';

let { width, height } = Dimensions.get('window');

const widthPercentageToDP = (widthPercent) => {
    const elemWidth =
        typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent) => {
    const elemHeight =
        typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const listenOrientationChange = (callback) => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
        width = window.width;
        height = window.height;
        if (typeof callback === 'function') {
            callback(width < height ? 'portrait' : 'landscape');
        }
    });
    return subscription;
};

export { widthPercentageToDP, heightPercentageToDP, listenOrientationChange };
