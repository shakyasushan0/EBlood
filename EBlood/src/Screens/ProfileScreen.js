import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, Avatar, Caption, TextInput, Button} from 'react-native-paper';
import {updateUser, updateAvatar} from '../Redux/ActionCreators';
import {tempAvatar} from '../Constants/Images';
import Feather from 'react-native-vector-icons/Feather';
import * as Validator from '../Constants/validators';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {baseUrl} from '../Constants/urls';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
const ProfileScreen = (props) => {
  const {user} = useSelector((state) => state.user);
  const [fullName, setfullName] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [bloodGroup, setbloodGroup] = useState('');
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setfullName(user.fullName);
    setContact(user.contact);
    setAge(user.age);
    setAvatar(user.avatar);
    setbloodGroup(user.bloodGroup);
  }, []);
  useEffect(() => {
    if (avatar != user.avatar) {
      fetch(`${baseUrl}user/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          fullName: fullName,
          contact: contact,
          age: age,
          bloodGroup: bloodGroup,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          try {
            const value = JSON.stringify(
              Object.assign(data, {token: user.token}),
            );
            AsyncStorage.setItem('user', value);
            dispatch(updateUser(data));
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [avatar]);

  const uploadPic = async () => {
    setUploadLoading(true);
    const data = new FormData();
    data.append('file', path);
    data.append('upload_preset', 'instaPosts');
    data.append('cloud_name', 'mycloud17');
    fetch('https://api.cloudinary.com/v1_1/mycloud17/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        editAvatar(data.url);
      })
      .catch((err) => alert('Error : ', err.message));
  };

  const editAvatar = (url) => {
    fetch(`${baseUrl}user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({avatar: url}),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const value = JSON.stringify(
            Object.assign(data, {token: user.token}),
          );
          AsyncStorage.setItem('user', value);
          dispatch(updateAvatar(data));
        } catch (e) {
          console.log(e);
        }
        setUploadLoading(false);
        ToastAndroid.show('Successfully updated!', ToastAndroid.SHORT);
      })
      .catch((err) => alert('Error : ', err));
  };

  const updateData = () => {
    setLoading(true);
    fetch(`${baseUrl}user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        fullName: fullName,
        contact: contact,
        age: age,
        bloodGroup: bloodGroup,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const value = JSON.stringify(
            Object.assign(data, {token: user.token}),
          );
          AsyncStorage.setItem('user', value);
          dispatch(updateUser(data));
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
        ToastAndroid.show('Successfully updated!', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };

  const uploadAvatar = () => {
    const options = {
      title: 'Select Avatar',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        let path;
        path = `data:image/jpeg;base64,${response.data}`;
        setPath(path);

        setAvatarSource(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.upperContainer, {backgroundColor: colors.primary}]}>
        <Text style={styles.profileText}>PROFILE</Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.profileSection}>
          <View style={styles.editIcon}>
            <Feather name="edit" size={24} color="gray" onPress={showModal} />
          </View>
          {user.avatar ? (
            <Avatar.Image
              style={styles.avatar}
              source={{uri: user.avatar}}
              size={90}
            />
          ) : (
            <Avatar.Text size={90} label={user.fullName.charAt(0)} />
          )}
          {user.fullName && <Text style={styles.name}>{user.fullName}</Text>}
          {user.email && (
            <Caption style={styles.username}>
              @{user.email.split('@')[0]}
            </Caption>
          )}
        </View>
      </View>
      <Modal transparent visible={visible} onRequestClose={hideModal}>
        <View style={styles.modalBackground}>
          <View style={styles.formContainer}>
            {user.avatar ? (
              <Avatar.Image
                style={styles.avatar}
                source={{uri: user.avatar}}
                size={100}
              />
            ) : avatarSource ? (
              <Avatar.Image
                style={styles.avatar}
                source={avatarSource}
                size={90}
              />
            ) : (
              <Avatar.Text size={100} label={user.fullName.charAt(0)} />
            )}
            <View style={styles.iconContainer}>
              <Feather
                name="camera"
                size={24}
                style={styles.cameraIcon}
                onPress={uploadAvatar}
              />
            </View>
            <Button
              mode="contained"
              style={{marginTop: 10}}
              loading={uploadLoading}
              disabled={avatarSource ? false : true}
              onPress={uploadPic}>
              Upload
            </Button>

            <ScrollView style={{marginTop: 15}}>
              <TextInput
                label="Full Name"
                style={styles.textinput}
                mode="outlined"
                value={fullName}
                onChangeText={(text) => setfullName(text)}
              />
              <TextInput
                label="Contact"
                style={styles.textinput}
                mode="outlined"
                keyboardType="phone-pad"
                value={contact}
                onChangeText={(text) => setContact(text)}
              />
              <TextInput
                label="Age"
                style={styles.textinput}
                mode="outlined"
                keyboardType="decimal-pad"
                value={age}
                onChangeText={(text) => setAge(text)}
              />
              <TextInput
                label="Blood Group"
                style={styles.textinput}
                mode="outlined"
                value={bloodGroup}
                onChangeText={(text) => setbloodGroup(text)}
              />

              <Button
                mode="outlined"
                style={[styles.button, {backgroundColor: colors.success}]}
                color="white"
                loading={loading}
                disabled={
                  Validator.nameValidator(fullName) &&
                  Validator.contactValidator(contact) &&
                  Validator.ageValidator(age) &&
                  Validator.bloodGroupValidator(bloodGroup)
                    ? false
                    : true
                }
                onPress={updateData}>
                Update
              </Button>

              <Button
                mode="outlined"
                style={[styles.cancelButton, {backgroundColor: colors.primary}]}
                color="white"
                onPress={() => setVisible(false)}>
                Cancel
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 1.2,
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  profileText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    marginTop: 30,
  },
  profileSection: {
    width: wp('90%'),
    height: hp('35%'),
    backgroundColor: 'white',
    borderRadius: 14,
    marginTop: -hp('25%'),
    elevation: 15,
    alignItems: 'center',
    paddingTop: 30,
  },
  avatar: {},
  name: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 10,
  },
  textinput: {
    width: wp('90%'),
    backgroundColor: 'white',
  },
  username: {
    fontSize: 14,
  },
  editIcon: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  modalBackground: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: wp('95%'),
    height: hp('90%'),
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 15,
  },
  cameraIcon: {},
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginRight: -50,
    borderWidth: 0.1,
    elevation: 5,
  },
  button: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
});
