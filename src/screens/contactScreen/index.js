import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'

import colors from '../../constants/Colors';
import {contacts} from '../../constants/DummyContacts.json';

const ContactScreen = () => {
  const [contactSearch, setContactSearch] = useState(contacts);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setContactSearch(
      contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      }),
    );
  }, [searchText]);

  const callingHandler = contact => {
    navigation.navigate('Calling', {contact});
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <View style={styles.contactView}>
              <View style={styles.icontView}></View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={contactSearch}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => callingHandler(item)}
              style={styles.contactViewVertical}>
              <View style={styles.icontViewVertical}></View>
              <View style={styles.contactInfoVertical}>
                <Text style={styles.contactNameVertical}>{item.name}</Text>
                <Text style={styles.contactNumberVertical}>{item.phone}</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
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
    backgroundColor: colors.grey100,
    borderRadius: 20,
  },
  contactInfoVertical: {
    marginLeft: 10,
  },
});
