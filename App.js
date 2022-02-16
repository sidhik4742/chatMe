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

import {requestUserPermission} from './src/services/notification';

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
