import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // voximplant.registerPushNotificationsToken(fcmToken);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error getting token', [{text: 'OK'}]);
    }
  }
};
