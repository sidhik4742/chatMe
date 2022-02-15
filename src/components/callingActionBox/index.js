import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../../constants/Colors';

CallingActionBox = ({callHangUpHandler}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isVideoON, setIsVideoON] = useState(true);
  const [isMicON, setIsMicON] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  const cameraFlipHandler = () => {
    console.warn('Camera flip...');
  };
  // const phoneHangUpHandler = () => {
  //   navigation.navigate('Contact');
  // };

  return (
    <View style={styles.box}>
      {/* <Text>Calling action box</Text> */}
      <Pressable onPress={cameraFlipHandler} style={styles.iconView}>
        <Ionicons name="camera-reverse" size={30} color={color.white} />
      </Pressable>
      <Pressable
        onPress={() => setIsVideoON(previouesValue => !previouesValue)}
        style={styles.iconView}>
        <MaterialIcons
          name={isVideoON ? 'videocam' : 'videocam-off'}
          size={30}
          color={color.white}
        />
      </Pressable>
      <Pressable
        onPress={() => setIsMicON(previouesValue => !previouesValue)}
        style={styles.iconView}>
        <MaterialIcons
          name={isMicON ? 'mic' : 'mic-off'}
          size={30}
          color={color.white}
        />
      </Pressable>
      <Pressable
        onPress={callHangUpHandler}
        style={[styles.iconView, {backgroundColor: color.red600}]}>
        <MaterialCommunityIcons
          name="phone-hangup"
          size={30}
          color={color.white}
        />
      </Pressable>
    </View>
  );
};

export default CallingActionBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: color.transparentBlackHard,
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.grey800,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
