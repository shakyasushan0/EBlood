import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DonationHistory = (props) => (
  <View style={styles.container}>
    <Text>DonationHistory</Text>
  </View>
);
export default DonationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
