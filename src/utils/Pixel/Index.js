/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {Dimensions, PixelRatio} from 'react-native';
let {width, height} = Dimensions.get('window');
const widthPercentageToDP = widthPercent => {
  const elemWidth =
    widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const listenOrientationChange = that => {
  Dimensions.addEventListener('change', newDimensions => {
    width = newDimensions.window.width;
    height = newDimensions.window.height;

    that.setState({
      orientation: width < height ? 'portrait' : 'landscape',
    });
  });
};

export {widthPercentageToDP, heightPercentageToDP, listenOrientationChange};
