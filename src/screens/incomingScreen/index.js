import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

import bg from '../../../assets/images/PhotoDummy.png';
import Colors from '../../constants/Colors';

const IncomingScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground style={styles.firstCameraScreen}>
        <View style={styles.textContent}>
          <View style={styles.profileView}>
            <Image source={bg} style={styles.profileImage} />
          </View>
          <Text style={styles.title}>Calling...</Text>
        </View>
      </ImageBackground>
      <View style={styles.incomingActionBox}>
        <Pressable
          onPress={navigation.navigate('Contact')}
          style={styles.incomingActionView}>
          <Octicons name="x" size={30} color="#fff" />
        </Pressable>
        <Pressable
          onPress={navigation.navigate('Calling')}
          style={[
            styles.incomingActionView,
            {backgroundColor: Colors.blue600},
          ]}>
          <Octicons name="check" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default IncomingScreen;

const styles = StyleSheet.create({
  firstCameraScreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#000',
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
  incomingActionBox: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 80,
  },
  incomingActionView: {
    width: 70,
    height: 70,
    marginHorizontal: 30,
    borderRadius: 40,
    backgroundColor: Colors.red600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
