import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../util/permissions';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  A_plus,
  AB_minus,
  AB_plus,
  A_minus,
  B_minus,
  B_plus,
  O_minus,
  O_plus,
} from '../Constants/Images';

const MapScreen = (props) => {
  const [location, setLocation] = useState({latitude: null, longitude: null});
  const {donors} = useSelector((state) => state.donors);
  const dispatch = useDispatch();
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

  if (location.latitude && location.longitude && donors.length != 0) {
    return (
      <MapView
        showsUserLocation
        style={{flex: 1}}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {donors.map((donor) => {
          const {bloodGroup} = donor;
          return (
            <Marker
              coordinate={donor.location}
              image={
                bloodGroup == 'A+'
                  ? A_plus
                  : bloodGroup == 'A-'
                  ? A_minus
                  : bloodGroup == 'B+'
                  ? B_plus
                  : bloodGroup == 'B-'
                  ? B_minus
                  : bloodGroup == 'AB+'
                  ? AB_plus
                  : bloodGroup == 'AB-'
                  ? AB_minus
                  : bloodGroup == 'O+'
                  ? O_plus
                  : O_minus
              }
              title={donor.fullName}
              key={donor._id}
            />
          );
        })}
      </MapView>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
