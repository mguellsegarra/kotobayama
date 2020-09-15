import DeviceInfo, {isTablet as isTabletAsync} from 'react-native-device-info';
import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isTablet = isTabletAsync;
export const isIosAndNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch();
