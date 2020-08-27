import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './AuthStack';
import AsyncStorage from '@react-native-community/async-storage';
import Drawer from './DrawerStack';
import {useDispatch, useSelector} from 'react-redux';
import {storeUser, addDonor, addCurrentLocation} from '../Redux/ActionCreators';
import {requestLocationPermission} from '../util/permissions';
import SplashScreen from '../Screens/SplashScreen';
import Geolocation from 'react-native-geolocation-service';

import {baseUrl} from '../Constants/urls';

const RootStack = (props) => {
  const {user} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const stringValue = await AsyncStorage.getItem('user');
    const jsonValue = stringValue != null ? JSON.parse(stringValue) : null;
    await dispatch(storeUser(jsonValue));
    getDonors(jsonValue.token);
    const hasLocationPermission = requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(addCurrentLocation(location));
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    setLoading(false);
  };
  const getDonors = async (token) => {
    fetch(`${baseUrl}user/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(addDonor(data)))
      .catch((err) => console.log(err));
  };

  if (loading) return <SplashScreen />;
  else {
    return (
      <NavigationContainer>{user ? <Drawer /> : <Auth />}</NavigationContainer>
    );
  }
};
export default RootStack;
