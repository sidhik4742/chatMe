import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Voximplant} from 'react-native-voximplant';

import bg from '../../../assets/images/bg.png';

const StartingScreen = () => {
  const voximplant = Voximplant.getInstance();
  const navigation = useNavigation();

  useEffect(() => {
    const ConnectionStatus = async () => {
      const status = await voximplant.getClientState();
      if (Voximplant.ClientState.DISCONNECTED === status) {
        await voximplant.connect();
      } else if (Voximplant.ClientState.LOGGED_IN === status) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Contact'}],
        });
      }
    };
    ConnectionStatus();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'default'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground style={styles.bg}>
        <View style={styles.screenContent}>
          <Text style={styles.textHeading}>chatMe</Text>
          <Text style={styles.textSubHeading}>A Video Chat App</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Signup')}
            style={[styles.button, {backgroundColor: Colors.blueA150}]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  );
};

export default StartingScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#A1C4FD',
    width: '100%',
    height: '100%',
    resizeMode: 'streach',
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontSize: 36,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Helvetica Neue',
    lineHeight: 46,
    color: Colors.primary,
  },
  textSubHeading: {
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 28,
    color: Colors.white,
    marginBottom: 30,
  },
  button: {
    width: 200,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.blue250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 16,
    color: Colors.white,
  },
});
