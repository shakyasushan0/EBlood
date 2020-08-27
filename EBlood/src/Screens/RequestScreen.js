import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {storeUser} from '../Redux/ActionCreators';

const RequestScreen = (props) => {
  const disptach = useDispatch();

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          disptach(storeUser(null));
          AsyncStorage.clear();
        }}>
        RequestScreen
      </Text>
    </View>
  );
};
export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
