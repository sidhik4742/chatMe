/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation';
import {QueryClientProvider, QueryClient} from 'react-query';
import messaging from '@react-native-firebase/messaging';

import {requestUserPermission} from './src/services/notification';
import notifee from '@notifee/react-native';

import chatMeIcon from './assets/images/chatmelogo.png';

const getChannelId = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  console.warn(channelId);
  return channelId;
};

// messaging().onNotificationOpenedApp(async remoteMessage => {
//   console.warn(remoteMessage, 'remoteMessage');
// });

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Message handled in the background!',
    remoteMessage.data.voximplant,
  );
  const channelId = await getChannelId();
  notifee.displayNotification({
    title: 'Calling...',
    body: `${
      JSON.parse(remoteMessage.data.voximplant).display_name
    } is calling you on chatMe`,
    android: {
      channelId: channelId,
      sound: 'default',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
        ios: {
          sound: 'default',
        },
      },
    },
  });
});

const App = () => {
  const client = new QueryClient();
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        // translucent
      />
      <NavigationContainer>
        <QueryClientProvider client={client}>
          <AppNavigation />
        </QueryClientProvider>
      </NavigationContainer>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default App;
