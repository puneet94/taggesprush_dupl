/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  
  
  Dimensions
  
} from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';
import {   createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 

import MainScreen from "./_js/components/main";

import SettingsScreen from "./_js/components/settings";
import ImprintScreen from "./_js/components/imprint";

import PrivacyPolicyScreen from "./_js/components/privacyPolicy";



const AppNavigator = createAppContainer(createStackNavigator(
  {
    Main: MainScreen,
    Imprint: ImprintScreen,
    PrivacyPolicy: PrivacyPolicyScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Main',
  }
));



export default class App extends React.Component {

  render() {
    return (
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    );
  }
}

