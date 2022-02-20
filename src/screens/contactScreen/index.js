import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useQuery, QueryClient} from 'react-query';
import axiosInstance from '../../config/axios/index';
import {Voximplant} from 'react-native-voximplant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import colors from '../../constants/Colors';
import {contacts} from '../../constants/DummyContacts.json';

const permisions = [
  'android.permission.RECORD_AUDIO',
  'android.permission.CAMERA',
];

const ContactScreen = () => {
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();
  const queryClient = new QueryClient();

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [contactSearch, setContactSearch] = useState(contacts);
  const [searchText, setSearchText] = useState('');
  const [activeUser, setActiveUser] = useState('');
  // const user =
  const {data, isLoading} = useQuery('contacts', async () => {
    try {
      const response = await axiosInstance.get('/users/getcontacts');
      console.log(response.data?.result?.result);
      return response.data?.result?.result;
    } catch (error) {
      console.warn(error);
      return error.response.data;
    }
  });

  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(permisions);
      const recordAudioGranted =
        granted['android.permission.RECORD_AUDIO'] === 'granted';
      const cameraGranted = granted['android.permission.CAMERA'] === 'granted';
      if (!recordAudioGranted || !cameraGranted) {
        Alert.alert('Permissions', 'Please grant permissions to use this app', [
          {text: 'OK'},
        ]);
      } else {
        setPermissionGranted(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    setContactSearch(
      contacts.filter(contact => {
        return contact.userName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }),
    );
  }, [searchText]);

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      console.log('Incoming call');
      navigation.navigate('Incoming', {
        call: incomingCallEvent.call,
      });
    });
    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  useEffect(() => {
    getActiveUser();
  }, []);

  const getActiveUser = async () => {
    const value = await AsyncStorage.getItem('user');
    setActiveUser(JSON.parse(value).userName);
  };

  const callingHandler = contact => {
    navigation.navigate('Outgoing', {
      userName: contact.userName,
      permissionGranted,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <>
          <View style={styles.textView}>
            <Ionicon
              style={styles.searchIcon}
              name="search"
              size={25}
              color={colors.gray}
            />
            <TextInput
              onChangeText={setSearchText}
              style={styles.input}
              placeholder="Search..."
            />
          </View>
          <FlatList
            horizontal={true}
            data={contacts}
            renderItem={({item}) => {
              return (
                <Pressable>
                  <View style={styles.contactView}>
                    <View style={styles.icontView}></View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{item.userName}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={item => item.id}
          />

          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={data}
            renderItem={({item}) => {
              return (
                <>
                  {item.userName != activeUser ? (
                    <Pressable
                      onPress={() => callingHandler(item)}
                      style={styles.contactViewVertical}>
                      <View style={styles.icontViewVertical}>
                        <Ionicon
                          style={styles.contactIcon}
                          name="person"
                          size={50}
                          color={colors.black}
                        />
                      </View>
                      <View style={styles.contactInfoVertical}>
                        <Text style={styles.contactName}>{item.userName}</Text>
                      </View>
                    </Pressable>
                  ) : null}
                </>
              );
            }}
            keyExtractor={item => item.userId}
          />
        </>
      ) : (
        <View style={styles.loader}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    alignItems: 'stretch',
    backgroundColor: colors.grey100,
    borderRadius: 20,
  },
  input: {
    color: colors.black,
  },
  icontView: {
    margin: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey100,
    borderRadius: 20,
  },
  contactView: {
    marginBottom: 50,
  },
  contactName: {
    textAlign: 'center',
    color: colors.black,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey100,
  },
  contactViewVertical: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  icontViewVertical: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfoVertical: {
    marginLeft: 10,
  },
  loader: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
