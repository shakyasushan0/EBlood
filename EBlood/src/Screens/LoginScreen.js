import React, {createRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme, TextInput, TouchableRipple, Button} from 'react-native-paper';
import {footer} from '../Constants/Images';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {baseUrl} from '../Constants/urls';
import {useDispatch, useSelector} from 'react-redux';
import {storeUser, clearUser} from '../Redux/ActionCreators';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMess, setErrMess] = useState(null);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {colors} = useTheme();
  let passwordRef = createRef();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    Alert.alert('Exit App?', 'Are you sure you want to exit app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const login = () => {
    setErrMess(null);
    setLoading(true);
    axios
      .post(`${baseUrl}user/login`, {
        email,
        password,
      })
      .then((res) => {
        //console.log(res.data.user);

        try {
          const value = JSON.stringify(res.data.user);
          AsyncStorage.setItem('user', value);
          dispatch(storeUser(res.data.user));
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrMess('Invalid email or password!!!');
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.upperBox, {backgroundColor: colors.primary}]}>
            <Text style={styles.loginText}>LOGIN</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              mode="flat"
              onSubmitEditing={() => passwordRef.focus()}
              style={styles.textInput}
              left={<TextInput.Icon name="account" size={24} />}
              underlineColor={colors.primary}
              returnKeyType={'next'}
              autoFocus
              autoCapitalize="none"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              ref={(input) => {
                passwordRef = input;
              }}
              placeholder="Password"
              secureTextEntry
              mode="flat"
              style={styles.textInput}
              left={<TextInput.Icon name="lock" size={24} />}
              underlineColor={colors.primary}
              autoCapitalize="none"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={async () => {
                try {
                  const stringValue = await AsyncStorage.getItem('user');
                  const jsonValue =
                    stringValue != null ? JSON.parse(stringValue) : null;
                  console.log(jsonValue);
                } catch (e) {
                  // error reading value
                  console.log(e);
                }
              }}>
              <Text
                style={styles.forgotPassword}
                onPress={() => {
                  AsyncStorage.clear();
                  dispatch(clearUser());
                  console.log('pressed');
                }}>
                Forgot Password?
              </Text>
            </TouchableRipple>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                color="white"
                style={[styles.button, {backgroundColor: colors.primary}]}
                onPress={login}
                loading={loading}
                disabled={
                  email.length == 0 || password.length == 0 ? true : false
                }>
                Login
              </Button>
            </View>
          </View>
          <View style={{marginTop: wp('55%')}}>
            <TouchableRipple
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={{fontSize: 16}}>
                Don't have account?{' '}
                {<Text style={{fontWeight: 'bold'}}>SIGNUP</Text>}
              </Text>
            </TouchableRipple>
          </View>
          {errMess && (
            <View style={{opacity: 1}}>
              <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                  color: colors.primary,
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                {errMess}
              </Animatable.Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Image source={footer} style={styles.footer} />
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  upperBox: {
    height: hp('45%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  formContainer: {
    position: 'absolute',
    width: wp('90%'),
    height: 220,
    backgroundColor: 'white',
    top: hp('35%'),
    borderRadius: 10,
    elevation: 10,
    paddingTop: 15,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: wp('80%'),
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  button: {
    borderRadius: 14,
    width: 150,
    height: 45,
    justifyContent: 'center',
    elevation: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  loginText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
    marginTop: hp('20%'),
  },
  footer: {
    bottom: -140,
    right: -100,
    position: 'absolute',
    width: '100%',
    height: '40%',
  },
});
