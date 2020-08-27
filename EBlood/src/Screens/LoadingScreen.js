import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

const LoadingScreen = (props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
