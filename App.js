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

import CallingScreen from './src/screens/callingScreen';
import ContactScreen from './src/screens/contactScreen';
import IncomingScreen from './src/screens/incomingScreen';

const App = () => {
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        // translucent
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      {/* <CallingScreen /> */}
      {/* <ContactScreen /> */}
      {/* <IncomingScreen /> */}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default App;
