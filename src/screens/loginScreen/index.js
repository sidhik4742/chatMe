import {
  Alert,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';
import {QueryClient} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Colors from '../../constants/Colors';

const LoginScreen = () => {
  const [data, setData] = useState({
    userName: '',
    userPassword: '',
  });
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();
  const queryClient = new QueryClient();

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

  const loginHandler = async () => {
    try {
      const response = await voximplant.login(
        `${data.userName}@chatme.sidhik.voximplant.com`,
        data.userPassword,
      );
      console.warn(response);
      await AsyncStorage.setItem('user',JSON.stringify(data));
      navigation.reset({
        index: 0,
        routes: [{name: 'Contact'}],
      });
    } catch (error) {
      if (error?.code == 401) {
        Alert.alert(
          'Login failed!',
          'Invalid Credentials, Please check your user name and password',
          [{text: 'OK'}],
        );
      } else if (error?.code == 403) {
        Alert.alert('Login failed!', 'Account is not activated', [
          {text: 'OK'},
        ]);
      } else if (error?.code == 404) {
        Alert.alert(
          'Login failed!',
          'Account not found, Please check your user name',
          [{text: 'OK'}],
        );
      } else {
        console.warn(error);
        Alert.alert('Login failed', 'Something went wrong', [{text: 'OK'}]);
      }
    }
  };

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
          <Text style={styles.textSubHeading}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formTextView}>
            <Text style={styles.formText}>User Name</Text>
          </View>
          <TextInput
            style={styles.input}
            value={data.userName}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setData({...data, userName: text})}
          />
          <View style={styles.formTextView}>
            <Text style={styles.formText}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            value={data.userPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onChangeText={text => setData({...data, userPassword: text})}
          />
          <Pressable onPress={loginHandler} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <View style={styles.signupTextView}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text
                style={
                  ([styles.signupText],
                  {color: Colors.primary, fontWeight: 'normal'})
                }>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#78C6F2',
    width: '100%',
    height: '100%',
    resizeMode: 'streach',
  },
  screenContent: {
    position: 'absolute',
    top: 70,
    left: 0,
    paddingHorizontal: 20,
  },
  textHeading: {
    fontSize: 36,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Helvetica Neue',
    lineHeight: 46,
  },
  textSubHeading: {
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 28,
    color: Colors.white,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: '50%',
  },
  formTextView: {
    marginBottom: 5,
    marginHorizontal: 40,
    alignSelf: 'flex-start',
  },
  formText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 16,
    color: Colors.white,
  },
  input: {
    width: '80%',
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.grey200,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: Colors.black,
  },
  button: {
    width: 125,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.blue250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  signupTextView: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 14,
    color: Colors.black,
  },
});
