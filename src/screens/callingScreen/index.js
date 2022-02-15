import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

import bg from '../../../assets/images/PhotoDummy.png';
import CallingActionBox from '../../components/callingActionBox';

const CallingScreen = () => {
  const route = useRoute();
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground source={bg} style={styles.firstCameraScreen}>
        <View style={styles.textContent}></View>
        <View style={styles.secondCameraView}>
          <Image source={bg} style={styles.secondCameraScreen} />
        </View>
      </ImageBackground>
      <View style={styles.callingActionBox}>
        <CallingActionBox callHangUpHandler={callHangUpHandler} />
      </View>
    </>
  );
};

export default CallingScreen;

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
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  secondCameraView: {
    width: 150,
    height: 250,
    position: 'absolute',
    top: 60,
    right: 0,
  },
  secondCameraScreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginHorizontal: -10,
    marginVertical: -10,
    borderRadius: 20,
  },
  callingActionBox: {
    marginTop: 'auto',
  },
});
