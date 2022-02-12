/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation';
import {QueryClientProvider, QueryClient} from 'react-query';

const App = () => {
  const client = new QueryClient();

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
