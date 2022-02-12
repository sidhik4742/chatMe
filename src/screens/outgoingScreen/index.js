import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import CallingActionBox from '../../components/callingActionBox';
import bg from '../../../assets/images/PhotoDummy.png';

const OutgoingCall = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Calling');
    }, 3000);
  }, []);

  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground source={bg} style={styles.firstCameraScreen}>
        <View style={styles.textContent}>
          <View style={styles.profileView}>
            <Image source={bg} style={styles.profileImage} />
          </View>
          <Text style={styles.title}>{route?.params?.contact?.name}</Text>
          <Text style={styles.title}>
            Calling... {route?.params?.contact?.phone}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.callingActionBox}>
        <CallingActionBox />
      </View>
    </View>
  );
};

export default OutgoingCall;

const styles = StyleSheet.create({
  firstCameraScreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContent: {
    position: 'absolute',
    // justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileView: {
    width: 100,
    height: 100,
    // borderRadius: 50,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  callingActionBox: {
    marginTop: 'auto',
  },
});
