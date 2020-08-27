import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Drawer, Avatar, Caption, useTheme} from 'react-native-paper';
import {tempAvatar} from '../Constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {clearUser} from '../Redux/ActionCreators';

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

const DrawerContent = (props) => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const username = user ? user.email.split('@')[0] : '';
  const signout = () => {
    Alert.alert(
      'SIGNOUT?',
      'Are you sure you want to signout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.clear();
            dispatch(clearUser());
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          <Avatar.Image
            source={user.avatar ? {uri: user.avatar} : tempAvatar}
            size={100}
          />
          <View style={styles.info}>
            <Text style={styles.name}>
              {user ? user.fullName : 'LOADING...'}
            </Text>
            <Caption>@{username}</Caption>
          </View>
        </View>

        <Drawer.Section style={styles.options}>
          <DrawerItemList {...props} />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.signout}>
        <DrawerItem
          label="Signout"
          icon={({color, size}) => (
            <Feather name="log-out" size={size} color={color} />
          )}
          onPress={signout}
        />
      </Drawer.Section>
    </View>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 20,
    flexDirection: 'row',
  },
  info: {
    paddingLeft: 10,
    marginTop: 25,
  },
  name: {
    fontSize: 16,
  },
  options: {
    marginTop: 20,
  },
  signout: {
    marginBottom: 0,
    borderTopWidth: 0.7,
    borderTopColor: '#DAE0E2',
  },
});
