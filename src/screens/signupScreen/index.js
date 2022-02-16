import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import Colors from '../../constants/Colors';
import axiosInstance from '../../config/axios';
import {useNavigation} from '@react-navigation/native';
import {QueryClient, useMutation} from 'react-query';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedCircularProgress from 'react-native-animated-circular-progress';

const SignupScreen = () => {
  const [data, setData] = useState({
    userName: '',
    userDisplayName: '',
    userPassword: '',
  });

  const navigation = useNavigation();
  const queryClient = new QueryClient();

  const {signup, isLoading, isError} = useMutation(
    async () => {
      try {
        const response = await axiosInstance.post('/users/adduser', data);
        console.warn(response.data);
        if (response.data.result?.error) {
          Alert.alert('Error', response.data.result.error?.msg, [{text: 'OK'}]);
        } else {
          Alert.alert('Success', 'User added successfully', [{text: 'OK'}]);
        }
      } catch (error) {
        console.warn("error",error);
      }
    },
    {
      onSuccess: () => {
        Alert.alert('Success', 'Signup Successful', [{text: 'OK'}]);
        navigation.navigate('Login');
      },
      onError: () => {
        Alert.alert('Error', 'Signup Failed', [{text: 'OK'}]);
      },
    },
  );

  const signupHandler = async () => {
    if (
      data.userName.length === 0 ||
      data.userDisplayName.length === 0 ||
      data.userPassword.length === 0
    ) {
      Alert.alert('Failed', 'Please enter a valid data', [{text: 'OK'}]);
    } else {
      signup();
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
            <Text style={styles.formText}>User Display Name</Text>
          </View>
          <TextInput
            style={styles.input}
            value={data.userDisplayName}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setData({...data, userDisplayName: text})}
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
          <Pressable
            onPress={signupHandler}
            disable={isLoading}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <View style={styles.loginTextView}>
            <Text style={styles.loginText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={
                  ([styles.loginText],
                  {color: Colors.primary, fontWeight: 'normal'})
                }>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default SignupScreen;

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  loginTextView: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: 14,
    color: Colors.black,
  },
});
