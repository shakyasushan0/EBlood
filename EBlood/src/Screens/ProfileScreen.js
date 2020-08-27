import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

const ProfileScreen = (props) => {
  const {user} = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <Text onPress={() => console.log('user from profile : ', user)}>
        ProfileScreen
      </Text>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
