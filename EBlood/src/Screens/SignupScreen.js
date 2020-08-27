import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  useTheme,
  TextInput,
  Button,
  TouchableRipple,
  Snackbar,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import * as Validator from '../Constants/validators';
import {baseUrl} from '../Constants/urls';
import Geolocation from 'react-native-geolocation-service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {requestLocationPermission} from '../util/permissions';
import axios from 'axios';

const SignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [contact, setContact] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [response, setResponse] = useState('');
  const {colors} = useTheme();

  useEffect(() => {
    const hasLocationPermission = requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  const onSubmit = () => {
    if (location.latitude == null) {
      requestLocationPermission();
    } else {
      setLoading(true);
      axios
        .post(`${baseUrl}user/signup`, {
          fullName: name,
          email,
          password,
          age,
          bloodGroup,
          contact,
          location,
        })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
          setVisible(true);
          if (res.status == 200) {
            setTimeout(() => {
              props.navigation.navigate('Login');
            }, 3000);
          }
        })
        .catch((err) => {
          alert(err.mess);
        });
    }
  };
  const onDismissSnackBar = () => setVisible(false);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.primary}]}>
      <View style={styles.header}>
        <Text style={styles.signup}>SIGNUP</Text>
      </View>
      <View style={styles.formContainer}>
        <ScrollView>
          <TextInput
            style={styles.textInput}
            label="Full Name"
            mode="flat"
            placeholder="Your Full Name"
            //  underlineColor={colors.primary}
            left={<TextInput.Icon name="account" />}
            right={
              <TextInput.Icon
                name={
                  Validator.nameValidator(name)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.nameValidator(name)
                    ? colors.success
                    : colors.primary
                }
              />
            }
            value={name}
            onChangeText={(name) => setName(name)}
          />

          <TextInput
            style={styles.textInput}
            mode="flat"
            placeholder="Your Valid Email"
            label="Email"
            // underlineColor={colors.primary}
            left={<TextInput.Icon name="email" />}
            right={
              <TextInput.Icon
                name={
                  Validator.emailValidator(email)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.emailValidator(email)
                    ? colors.success
                    : colors.primary
                }
              />
            }
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            placeholder="Your Password"
            label="Password"
            secureTextEntry
            right={
              <TextInput.Icon
                name={
                  Validator.passwordValidator(password)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.passwordValidator(password)
                    ? colors.success
                    : colors.primary
                }
              />
            }
            left={<TextInput.Icon name="key" />}
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            placeholder="Your Contact"
            label="Contact"
            right={
              <TextInput.Icon
                name={
                  Validator.contactValidator(contact)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.contactValidator(contact)
                    ? colors.success
                    : colors.primary
                }
              />
            }
            left={<TextInput.Icon name="phone" />}
            value={contact}
            onChangeText={(Contact) => setContact(Contact)}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            label="Age"
            placeholder="Your Age"
            right={
              <TextInput.Icon
                name={
                  Validator.ageValidator(age)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.ageValidator(age) ? colors.success : colors.primary
                }
              />
            }
            left={<TextInput.Icon name="pencil" />}
            value={age}
            onChangeText={(age) => setAge(age)}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            label="Blood Group"
            placeholder="Your Blood Group (Eg: A+)"
            left={<TextInput.Icon name="water" />}
            right={
              <TextInput.Icon
                name={
                  Validator.bloodGroupValidator(bloodGroup)
                    ? 'check-circle'
                    : 'exclamation-thick'
                }
                color={
                  Validator.bloodGroupValidator(bloodGroup)
                    ? colors.success
                    : colors.primary
                }
              />
            }
            value={bloodGroup}
            onChangeText={(text) => setBloodGroup(text)}
          />
          <Button
            mode="outlined"
            color="white"
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={onSubmit}
            disabled={
              Validator.validateAll(
                name,
                email,
                password,
                age,
                bloodGroup,
                contact,
              )
                ? false
                : true
            }
            loading={loading}>
            SIGNUP
          </Button>
          <TouchableRipple onPress={() => props.navigation.navigate('Login')}>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Already have an account?{' '}
              {<Text style={{fontWeight: 'bold'}}>LOGIN</Text>}
            </Text>
          </TouchableRipple>
        </ScrollView>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              setVisible(false);
            },
          }}
          style={{backgroundColor: '#DAE0E2'}}>
          {response}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 4,
    backgroundColor: 'white',
    height: hp('75%'),
    width: wp('100%'),
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    elevation: 20,
  },
  signup: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    //textAlign: 'center',
    marginBottom: 25,
    marginTop: hp('10%'),
  },
  textInput: {
    backgroundColor: 'white',
    width: wp('80%'),
  },
  header: {
    flex: 1,
    paddingLeft: 25,
    paddingTop: 20,
  },
  button: {
    marginTop: 20,
  },
});
