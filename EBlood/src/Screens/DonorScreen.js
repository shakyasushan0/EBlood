import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DonorScreen = (props) => (
  <View style={styles.container}>
    <Text>DonorScreen</Text>
  </View>
);
export default DonorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
