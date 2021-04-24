import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CallService, AuthService} from '../../services';
import Call from './Call';
import InboxSeparator from '../InboxSeparator';

export default ({
  isActiveSelect,
  opponentsIds,
  selectedUsersIds,
  selectUser,
  unselectUser,
  closeSelect,
  initRemoteStreams,
  setLocalStream,
}) => {
  if (!isActiveSelect) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select users to start Videocall</Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={opponentsIds}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Call
            id={item}
            selectedUsersIds={selectedUsersIds}
            closeSelect={closeSelect}
            initRemoteStreams={initRemoteStreams}
            setLocalStream={setLocalStream}
          />
        )}
        ItemSeparatorComponent={InboxSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFill,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#1198d4',
    padding: 20,
    backgroundColor: '#f8f4f4',
  },
  userLabel: backgroundColor => ({
    backgroundColor,
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  }),
  userName: {color: 'white', fontSize: 20},
  btnCall: {
    backgroundColor: 'green',
    height: 30,
    width: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
