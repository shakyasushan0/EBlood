import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {useTheme, Avatar, Caption, Button, TextInput} from 'react-native-paper';
import {API_KEY} from '../Constants/keys';
import Polyline from '@mapbox/polyline';
import {tempAvatar} from '../Constants/Images';
import Geocoder from 'react-native-geocoding';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const DonorDetail = (props) => {
  const {colors} = useTheme();
  const {selectedDonor} = props.route.params;
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const {currentLocation} = useSelector((state) => state.user);
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    mergeCoords();
    getAddress();
  }, []);

  const mergeCoords = () => {
    const hasStartAndEnd =
      selectedDonor.location.latitude != null &&
      currentLocation.latitude != null;
    if (hasStartAndEnd) {
      const concatStart = `${currentLocation.latitude},${currentLocation.longitude}`;
      const concatDest = `${selectedDonor.location.latitude},${selectedDonor.location.longitude}`;
      getDirection(concatStart, concatDest);
    }
  };
  const getDirection = async (startLoc, destLoc) => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destLoc}&key=${API_KEY}`,
      );
      let respJson = await resp.json();
      const response = respJson.routes[0];
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const time = distanceTime.duration.text;
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      setCoords(coords);
      setDistance(distance);
      setTime(time);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAddress = () => {
    Geocoder.init(API_KEY);
    Geocoder.from(
      selectedDonor.location.latitude,
      selectedDonor.location.longitude,
    )
      .then((json) => {
        var addressComponent = json.results[0].address_components[1];
        var district = json.results[0].address_components[2];
        const fullAddress = `${addressComponent.long_name}, ${district.long_name}`;
        setAddress(fullAddress);
      })
      .catch((error) => console.warn(error));
  };
  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.distanceContainer}>
          <Text style={{color: colors.secondary}}>
            Estimated distance : {distance}
          </Text>
          <Text style={{color: colors.secondary}}>Estimated time: {time}</Text>
        </View>
        {selectedDonor.location.latitude && currentLocation.latitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedDonor.location.latitude,
              longitude: selectedDonor.location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={selectedDonor.location}
              title={selectedDonor.fullName}
            />
            <Marker
              coordinate={currentLocation}
              title="You are here"
              pinColor={colors.secondary}
            />
            {coords && (
              <MapView.Polyline
                strokeWidth={2}
                strokeColor={colors.primary}
                coordinates={coords}
              />
            )}
          </MapView>
        )}
      </View>
      <View style={styles.infoContainer}>
        {/* <Avatar.Image
          source={
            selectedDonor.avatar ? {uri: selectedDonor.avatar} : tempAvatar
          }
          style={styles.avatar}
          size={80}
        /> */}
        {selectedDonor.avatar ? (
          <Avatar.Image
            style={styles.avatar}
            source={{uri: selectedDonor.avatar}}
            size={90}
          />
        ) : (
          <Avatar.Text
            size={90}
            label={selectedDonor.fullName.charAt(0)}
            style={styles.avatar}
          />
        )}
        <View style={[styles.bloodGroup, {backgroundColor: colors.primary}]}>
          <Text style={styles.bloodText}>{selectedDonor.bloodGroup}</Text>
        </View>
        <Text style={styles.name}>{selectedDonor.fullName}</Text>
        <Caption style={styles.address}>{address}</Caption>
        <Button style={styles.button} mode="outlined" onPress={showModal}>
          Request For Blood
        </Button>
      </View>

      <Modal visible={modalVisible} onRequestClose={hideModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.formContainer}>
            <View style={{alignItems: 'flex-end'}}>
              <MaterialIcons name="cancel" size={24} onPress={hideModal} />
            </View>
            <View style={styles.form}>
              <TextInput
                mode="flat"
                placeholder="Patient name"
                label="Name"
                style={styles.textInput}
                underlineColor={colors.secondary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default DonorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
    //  elevation: 10,
  },
  infoContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  distanceContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    width: 200,
    elevation: 10,
    paddingLeft: 10,
    borderRadius: 7,
    backgroundColor: 'black',
  },
  avatar: {
    marginTop: -40,
    elevation: 10,
  },
  bloodGroup: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    marginRight: -60,
    elevation: 15,
  },
  bloodText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Raleway-Light',
    marginTop: 5,
  },
  address: {
    fontSize: 16,
  },
  button: {
    marginTop: 15,
  },
  modalBackground: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: wp('80%'),
    height: hp('50%'),
  },
  textInput: {
    backgroundColor: 'white',
    width: wp('70%'),
  },
  form: {
    alignItems: 'center',
  },
});
