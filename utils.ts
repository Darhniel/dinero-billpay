import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375
const scaleH = SCREEN_HEIGHT / 812

export function getNormalizedSizeWithPlatformOffset(size: number) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
    }
}

export function getNormalizedVerticalSizeWithPlatformOffset(size: number) {
    const newSize = size * scaleH
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
    }
}

export function isTablet() {
    if (SCREEN_WIDTH > 550) {
        return true;
    } else {
        return false;
    }
}

export function isScreenHeight770() {
    if (SCREEN_HEIGHT > 740 && SCREEN_HEIGHT < 760) {
        return true;
    } else {
        return false;
    }
};