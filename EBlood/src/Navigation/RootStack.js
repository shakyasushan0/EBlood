import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './AuthStack';
import AsyncStorage from '@react-native-community/async-storage';
import Drawer from './DrawerStack';
import {useDispatch, useSelector} from 'react-redux';
import {storeUser} from '../Redux/ActionCreators';
import {View} from 'react-native-animatable';
import SplashScreen from '../Screens/SplashScreen';

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
    dispatch(storeUser(jsonValue));
    setLoading(false);
  };
  if (loading) return <SplashScreen />;
  else {
    return (
      <NavigationContainer>{user ? <Drawer /> : <Auth />}</NavigationContainer>
    );
  }
};
export default RootStack;
