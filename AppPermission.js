import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';
// const PLATFORM_MICROPHONE_PERMISSIONS = {
//   ios: PERMISSIONS.IOS.MICROPHONE,
//   android: PERMISSIONS.ANDROID.RECORD_AUDIO,
// };
// const PLATFORM_PHOTO_PERMISSIONS = {
//   ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//   android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
// };
const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

const REQUEST_PERMISSION_TYPE = {
  //   microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  //   photo: PLATFORM_PHOTO_PERMISSIONS,
  location: PLATFORM_LOCATION_PERMISSIONS,
};
const PERMISSION_TYPE = {
  //   microphone: 'microphone',
  //   photo: 'photo',
  location: 'location',
};
class AppPermission {
  checkPermission = async type => {
    console.log('checkPermission type', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      console.log('checkPermission result', type);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      console.log('checkPermission error', error);
      return false;
    }
  };
  requestPermission = async permissions => {
    console.log('requestPermission permissions', permissions);
    try {
      const result = await request(permissions);
      console.log('requestPermission result', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('requestPermission error', error);
      return false;
    }
  };
  requestMultiple = async types => {
    console.log('requestMultiple types', types);
    const results = [];
    for (const type of types) {
      console.log('requestMultiple type', type);
      const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
      console.log('requestMultiple permission', type, permission);
      if (permission) {
        const result = await this.requestPermission(permission);
        console.log('requestMultiple type', type, result);
        results.push(result);
      }
    }
    for (const result of results) {
      if (!result) return false;
    }
    return true;
  };
  requestNotifyPermission = async () => {
    const {status, settings} = await requestNotifications([
      'alert',
      'sound',
      'badge',
    ]);
    console.log('requestNotifyPermission', status, settings, RESULTS.GRANTED);
    return status === RESULTS.GRANTED;
  };
}

const Permission = new AppPermission();

export {Permission, PERMISSION_TYPE};
