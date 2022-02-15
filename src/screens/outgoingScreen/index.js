import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import CallingActionBox from '../../components/callingActionBox';
import bg from '../../../assets/images/PhotoDummy.png';

const callSettings = {
  video: {
    sendVideo: true,
    receiveVideo: true,
  },
};

const OutgoingCall = () => {
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();
  const route = useRoute();
  // const {permissionGranted} = route.params;
  const {
    permissionGranted,
    userName,
    call: incomingCall,
    isIncomingCall,
  } = route?.params;

  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  const callHangUpHandler = () => {
    call.current.hangup();
  };

  const showError = reason => {
    Alert.alert('Call failed', 'Reason: ' + reason, [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  // * subscribe to endpoint events
  const subscribeToEndpointEvents = () => {
    endpoint.current.on(
      Voximplant.EndpointEvents.RemoteVideoStreamAdded,
      endpointEvent => {
        setRemoteVideoStreamId(endpointEvent.videoStream.id);
      },
    );
  };

  useEffect(() => {
    const makeCall = async () => {
      call.current = await voximplant.call(userName, callSettings);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      call.current.answer(callSettings);
    };

    // * subscribe to call events
    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        console.log('Call failed');
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        console.log('Call progressing');
        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        console.log('Call connected');
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        console.log('Call disconnected');
        setCallStatus('Disconnected');
        navigation.navigate('Contact');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvents();
      });
    };

    if (!permissionGranted) {
      navigation.navigate('Contact');
    } else {
      if (isIncomingCall) {
        answerCall();
      } else {
        makeCall();
      }
    }

    // * unsubscribe from call events
    return () => {
      call.current.off(voximplant.CallEvents.Failed);
      call.current.off(voximplant.CallEvents.ProgressToneStart);
      call.current.off(voximplant.CallEvents.Connected);
      call.current.off(voximplant.CallEvents.Disconnected);
      call.current.off(voximplant.CallEvents.LocalVideoStreamAdded);
      call.current.off(voximplant.CallEvents.EndpointAdded);
    };
  }, [permissionGranted]);

  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground source={bg} style={styles.firstCameraScreen}>
        {/* <Image source={bg} style={styles.secondCameraScreen} /> */}
        <Voximplant.VideoView
          style={styles.firstCameraScreen}
          videoStreamId={remoteVideoStreamId}
          scaleType={Voximplant.RenderScaleType.SCALE_FILL}
        />

        {callStatus!='Connected' ? (
          <View style={styles.textContent}>
            <View style={styles.profileView}>
              <Image source={bg} style={styles.profileImage} />
            </View>
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.title}>{callStatus}</Text>
          </View>
        ) : null}
        <View style={styles.secondCameraView}>
          {/* <Image source={bg} style={styles.secondCameraScreen} /> */}
          <Voximplant.VideoView
            style={styles.secondCameraScreen}
            videoStreamId={localVideoStreamId}
            scaleType={Voximplant.RenderScaleType.SCALE_FILL}
            showOnTop={true}
          />
        </View>
      </ImageBackground>
      <View style={styles.callingActionBox}>
        <CallingActionBox callHangUpHandler={callHangUpHandler} />
      </View>
    </View>
  );
};

export default OutgoingCall;

const styles = StyleSheet.create({
  firstCameraScreen: {
    // flex: 1,
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
  secondCameraView: {
    width: 150,
    height: 250,
    position: 'absolute',
    bottom: 100,
    right: 0,
    zIndex: 999,
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
