import React from 'react';

import {
  
  View,Text
} from 'react-native';
class PrivacyPolicyScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
  
    return {
      title: "Datenschutzerklärung",
    };
  }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Datenschutzerklärung</Text>
        </View>
      );
    }
  }

  export default PrivacyPolicyScreen;