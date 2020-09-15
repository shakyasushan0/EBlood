import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ReceivedRequest = (props) => (
  <View style={styles.container}>
    <Text>ReceivedRequest</Text>
  </View>
);
export default ReceivedRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
