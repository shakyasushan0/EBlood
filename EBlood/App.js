/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, StatusBar} from 'react-native';

import RootStack from './src/Navigation/RootStack';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {configureStore} from './src/Redux/configureStore';
import {Provider} from 'react-redux';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    primary: '#d73737',
    success: '#26ae60',
    headerTitle: '#DAE0E2',
  },
};

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar hidden />
        <RootStack />
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
