import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {data} from 'react-native-connectycube';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CallService} from '../../services';

export default ({
  selectedUsersIds,
  id,
  userCall,
  closeSelect,
  initRemoteStreams,
  setLocalStream,
  isActiveSelect,
}) => {
  // const [user, setUser] = useState('');
  // useEffect(() => {
  //   if (isActiveSelect) {
  //     const getUser = async () => {
  //       const data = await CallService.getUserById(id);
  //       setUser(data.full_name);
  //     };
  //     getUser();
  //   }
  // }, [user]);
  const user = CallService.getUserById(id, userCall).full_name;
  const selected = selectedUsersIds.some(userId => id === userId);
  const type = 'call';
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
    // console.log(data.items[1].user);
    selectedUsersIds.push(id);
    console.log(id);
    closeSelect();
    initRemoteStreams(selectedUsersIds);
    CallService.startCall(selectedUsersIds).then(setLocalStream);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user}</Text>
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
