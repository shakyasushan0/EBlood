import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List, useTheme, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileOptions = (props) => {
  const {colors} = useTheme();

  return (
    <TouchableRipple
      rippleColor={colors.secondary}
      onPress={() => props.navigation.navigate(props.item.screen)}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, {backgroundColor: colors.primary}]}>
          <Icon name={props.item.icon} size={24} color="white" />
        </View>
        <Text style={styles.text}>{props.item.name}</Text>
      </View>
    </TouchableRipple>
  );
};
export default ProfileOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingTop: 20,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 6,
    marginLeft: 25,
    fontSize: 18,
    fontWeight: '700',
  },
});
