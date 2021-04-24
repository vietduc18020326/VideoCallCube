import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CallService, AuthService} from '../../services';

export default ({
  selectedUsersIds,
  image = require('../../../assets/avatar.jpg'),
  id,
  closeSelect,
  initRemoteStreams,
  setLocalStream,
}) => {
  const user = CallService.getUserById(id);
  const selected = selectedUsersIds.some(userId => id === userId);
  // const type = selected
  //   ? 'radio-button-checked'
  //   : 'radio-button-unchecked';
  const type = 'call';
  //const onPress = selected ? unselectUser : selectUser;
  const onPress = async id => {
    //Create new user
    // const userProfile = {
    //   login: 'cuonglo',
    //   password: 'manhcuonglo',
    //   email: 'manhcuong2k@gmail.com',
    //   full_name: 'Marvin Simon',
    //   phone: '103246421233',
    //   website: 'https://dozensofdreams.com',
    //   user_tags: ['iphone', 'apple'],
    //   custom_data: JSON.stringify({middle_name: 'Baroibeo'}),
    // };
    // AuthService.create(userProfile);

    //Get user has tags apple
    // const searchParams = {tags: ['apple']};
    // const data = await AuthService.getUser(searchParams);
    // console.log(data.items);

    selectedUsersIds.push(id);
    console.log(selectedUsersIds);
    closeSelect();
    initRemoteStreams(selectedUsersIds);
    CallService.startCall(selectedUsersIds).then(setLocalStream);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user.name}</Text>
      <TouchableOpacity style={styles.btnCall} onPress={() => onPress(id)}>
        <MaterialIcon name={type} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 2,
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  userName: {color: 'black', fontSize: 20},
  btnCall: {
    backgroundColor: 'green',
    height: 30,
    width: '10%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
