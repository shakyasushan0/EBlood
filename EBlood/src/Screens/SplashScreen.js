import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SplashScreen = (props) => (
  <View style={styles.container}>
    <Text>SplashScreen</Text>
  </View>
);
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
