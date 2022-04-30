import DeviceInfo, {isTablet as isTabletAsync} from 'react-native-device-info';
import {Platform} from 'react-native';
import {
    widthPercentageToDP,
    heightPercentageToDP,
  } from 'react-native-responsive-screen';
  
export const isAndroid = Platform.OS === 'android';
export const isTablet = isTabletAsync;
export const isIosAndNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch();
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
;
