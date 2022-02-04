import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ContactScreen from '../screens/contactScreen';
import CallingScreen from '../screens/callingScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact',
        }}
      />
      <Stack.Screen
        name="Calling"
        component={CallingScreen}
        options={{title: 'Calling'}}
      />
      {/* <Stack.Screen
        name="Library"
        component={Library}
        options={{title: 'Library'}}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
