import React, {useState} from 'react';
import {View, Text, StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {baseUrl} from '../Constants/urls';
import {useSelector, useDispatch} from 'react-redux';
import {passwordValidator} from '../Constants/validators';
import {clearUser} from '../Redux/ActionCreators';
const AccountScreen = (props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [pwordloading, setPwordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const updatePassword = () => {
    setPwordLoading(true);
    fetch(`${baseUrl}user/changePassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        password: currentPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
        setPwordLoading(false);
        setCurrentPassword('');
        setNewPassword('');
      })
      .catch((err) => {
        alert('Error ', err.message);
        setPwordLoading(false);
      });
  };

  const deleteAccount = () => {
    setDeleteLoading(true);
    fetch(`${baseUrl}user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          AsyncStorage.clear();
          dispatch(clearUser());
        }
        return res.json();
      })
      .then((res) => {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);

        setDeleteLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <List.AccordionGroup>
        <List.Accordion
          id="0"
          title="Change Password"
          left={(props) => <List.Icon {...props} icon="pencil" />}>
          <TextInput
            label="Current Password"
            mode="outlined"
            style={styles.textInput}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            autoCapitalize="none"
            secureTextEntry
          />
          <TextInput
            label="New Password"
            mode="outlined"
            style={[styles.textInput, {marginTop: 10}]}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCapitalize="none"
            secureTextEntry
          />
          <Button
            style={styles.button}
            onPress={updatePassword}
            disabled={passwordValidator(newPassword) ? false : true}
            loading={pwordloading}>
            Update
          </Button>
        </List.Accordion>
        <List.Accordion
          id="1"
          title="Delete Account"
          left={(props) => <List.Icon {...props} icon="delete" />}>
          <Text style={styles.warning}>
            Please enter your password to delete your account
          </Text>
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
          />
          <Button
            style={styles.button}
            onPress={deleteAccount}
            loading={deleteLoading}>
            Delete
          </Button>
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    width: widthPercentageToDP('90%'),
  },
  button: {
    width: widthPercentageToDP('50%'),
    marginLeft: widthPercentageToDP('45%'),
    marginTop: 20,
  },
  warning: {
    color: 'red',
  },
});
