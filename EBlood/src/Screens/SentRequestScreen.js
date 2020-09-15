import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SentRequest = (props) => (
  <View style={styles.container}>
    <Text>SentRequest</Text>
  </View>
);
export default SentRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
