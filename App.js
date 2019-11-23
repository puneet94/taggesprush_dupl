/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

var PushNotification = require("react-native-push-notification");
import {
  StyleSheet,
  
  
  Dimensions
  
} from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';
import {   createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import MainScreen from "./_js/components/main";

import SettingsScreen from "./_js/components/settings";
import ImprintScreen from "./_js/components/imprint";

import PrivacyPolicyScreen from "./_js/components/privacyPolicy";


const StackConfig = {
  initialRouteName: 'Main',
  headerLayoutPreset: 'left',
	defaultNavigationOptions: {
		headerStyle: {
      backgroundColor: 'white',
		},
		headerTintColor: '#968154',
		headerTitleStyle: { color: '#968154', fontFamily: 'ptsans', fontWeight:'bold', textTransform:'uppercase'},
		headerBackTitle: null,
  }
}

const AppNavigator = createAppContainer(createStackNavigator(
  {
    Main: MainScreen,
    Imprint: ImprintScreen,
    PrivacyPolicy: PrivacyPolicyScreen,
    Settings: SettingsScreen
  },
  StackConfig
));



export default class App extends React.Component {
  componentDidMount(){
    console.log("hit moubt");
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
    
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM (OR FCM) SENDER ID",
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
    PushNotification.checkPermissions(function(data){
      console.log("persmissoon fata");
      console.log(data);
    }) 
  }
  render() {
    return (
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    );
  }
}

