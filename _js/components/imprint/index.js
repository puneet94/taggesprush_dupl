import React from 'react';

import {
  
  View,Text
} from 'react-native';

class ImprintScreen extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
        day: 0,
        weekday: 0,
        quote: '',
		}
  }
  
    static navigationOptions = ({ navigation }) => {
  
    return {
      title: "Impressum",
    };
  }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Impressum</Text>
        </View>
      );
    }
  }

  export default ImprintScreen;