import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ContactScreen from '../screens/contactScreen';
import CallingScreen from '../screens/callingScreen';
import OutgoingCall from '../screens/outgoingScreen';
import IncomingScreen from '../screens/incomingScreen';
import StartingScreen from '../screens/startingScreen';
import SignupScreen from '../screens/signupScreen';
import LoginScreen from '../screens/loginScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
        name="Incoming"
        component={IncomingScreen}
        options={{title: 'Incoming'}}
      /> */}
      <Stack.Screen
        name="Start"
        component={StartingScreen}
        options={{title: 'Start'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: 'Signup'}}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact',
        }}
      />
      <Stack.Screen
        name="Outgoing"
        component={OutgoingCall}
        options={{title: 'Outgoing'}}
      />
      <Stack.Screen
        name="Calling"
        component={CallingScreen}
        options={{title: 'Calling'}}
      />
      <Stack.Screen
        name="Incoming"
        component={IncomingScreen}
        options={{title: 'Incoming'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
