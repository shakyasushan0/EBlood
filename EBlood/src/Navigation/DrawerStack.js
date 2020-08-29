import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../Screens/ProfileScreen';
import RequestScreen from '../Screens/RequestScreen';
import DrawerContent from '../Screens/DrawerContentScreen';
import MapScreen from '../Screens/MapScreen';
import DonorScreen from '../Screens/DonorScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme, TouchableRipple} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import DonorDetail from '../Screens/DonorDetailScreen';

const ProfileStack = ({navigation}) => {
  const {colors} = useTheme();
  const profStack = createStackNavigator();
  return (
    <profStack.Navigator>
      <profStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableRipple
              style={{marginLeft: 5}}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color={colors.headerTitle} />
            </TouchableRipple>
          ),
          headerTitle: 'PROFILE',
          headerTitleStyle: {color: colors.headerTitle},
          headerShown: false,
        }}
      />
    </profStack.Navigator>
  );
};
const RequestStack = ({navigation}) => {
  const {colors} = useTheme();
  const reqStack = createStackNavigator();
  return (
    <reqStack.Navigator>
      <reqStack.Screen
        name="RequestStack"
        component={RequestScreen}
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableRipple
              style={{marginLeft: 5}}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color={colors.headerTitle} />
            </TouchableRipple>
          ),
          headerTitle: 'REQUEST',
          headerTitleStyle: {color: colors.headerTitle},
        }}
      />
    </reqStack.Navigator>
  );
};
const MapStack = ({navigation}) => {
  const {colors} = useTheme();
  const mapStack = createStackNavigator();
  return (
    <mapStack.Navigator>
      <mapStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableRipple
              style={{marginLeft: 5}}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color={colors.headerTitle} />
            </TouchableRipple>
          ),
          headerTitle: 'MAP',
          headerTitleStyle: {color: colors.headerTitle},
        }}
      />
    </mapStack.Navigator>
  );
};
const DonorStack = ({navigation}) => {
  const {colors} = useTheme();
  const donorStack = createStackNavigator();
  return (
    <donorStack.Navigator>
      <donorStack.Screen
        name="Donor"
        component={DonorScreen}
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableRipple
              style={{marginLeft: 5}}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color={colors.headerTitle} />
            </TouchableRipple>
          ),
          headerTitle: 'DONORS',
          headerTitleStyle: {color: colors.headerTitle},
          headerShown: false,
        }}
      />
      <donorStack.Screen
        name="DonorDetail"
        component={DonorDetail}
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableRipple
              style={{marginLeft: 5}}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color={colors.headerTitle} />
            </TouchableRipple>
          ),
          headerTitle: 'DONOR DETAIL',
          headerTitleStyle: {color: colors.headerTitle},
        }}
      />
    </donorStack.Navigator>
  );
};

const DrawerStack = ({navigation}) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
      }}
      initialRouteName="Map"
      drawerType="back">
      <Drawer.Screen
        name="Map"
        component={MapStack}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesome5Icon name="map-marked-alt" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Request"
        component={RequestStack}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesome5Icon name="user-alt" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Donor"
        component={DonorStack}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesome5Icon
              name="hand-holding-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesome5Icon name="user-alt" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
