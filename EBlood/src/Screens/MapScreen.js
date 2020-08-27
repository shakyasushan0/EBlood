import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MapScreen = (props) => (
  <View style={styles.container}>
    <Text>MapScreen</Text>
  </View>
);
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
