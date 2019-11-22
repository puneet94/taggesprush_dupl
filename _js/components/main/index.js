
import React from 'react';
/* react-native-get-location is outdated, does not work on iOS */
/* import GetLocation from 'react-native-get-location' */

import {
    StyleSheet,
  View,Text,Button,
  TouchableOpacity,
} from 'react-native';

import {  Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

class MenuScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
  
    return {
      title: "Main!",
      headerRight: 
      <View style={{flexDirection: 'row'}}>
         
          
      <Menu
      style={{marginRight: 10,}}
      onSelect={value =>  navigation.navigate(value)}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} >
          <View style={{width: 30, height:30, backgroundColor:'red'}}></View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{width: 200, marginTop:8, backgroundColor: 'white'}}>
        <MenuOption value={'Settings'} style={{width: 200,}}>
            <Text>settings</Text>
          </MenuOption>
          <View style={{backgroundColor: 'grey', height: 1}}></View>
          <MenuOption value={'Imprint'} style={{width: 200,}}>
            <Text>imprint</Text>
          </MenuOption>

          <View style={{backgroundColor: 'grey', height: 1}}></View>
          <MenuOption value={'PrivacyPolicy'} style={{width: 200}}>
            <Text>privacy policy</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
  </View>
    
    };
  
  }


    
    render(){
      
      return (
        <View style={styles.container}>
    <Text>{"Main"}</Text>
          
        </View>
      );
    }
  
  }


const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    
  });
  export default MenuScreen;