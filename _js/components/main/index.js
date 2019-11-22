
import React from 'react';
/* react-native-get-location is outdated, does not work on iOS */
/* import GetLocation from 'react-native-get-location' */

import {
    StyleSheet,
  View,Text,Button,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

import {  Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { getDay, getDayOfYear } from 'date-fns'
import * as data from '../../../MOCK_DATA.json';
import Marker, { Position, ImageFormat } from 'react-native-image-marker'
import Share from 'react-native-share';

import { ScrollView } from 'react-native-gesture-handler';


class MenuScreen extends React.Component {
    

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
      title: "Main!",
      headerRight: 
      <View style={{flexDirection: 'row'}}>
      <View>
      <TouchableOpacity onPress={ () => { navigation.getParam('_shareQuoteOfTheDay')(); }}>
        <Text>SHARE</Text>
        </TouchableOpacity>
        
        </View>
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

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({
      _shareQuoteOfTheDay: this._shareQuoteOfTheDay,
    })

    this._setQuoteOfTheDay(0);

  }

  _setQuoteOfTheDay = (do_math) => {

      var images = [
        require('../../../_images/day_1.png'),
        require('../../../_images/day_2.png'),
        require('../../../_images/day_3.png'),
        require('../../../_images/day_4.png'),
        require('../../../_images/day_5.png'),
        require('../../../_images/day_6.png'),
        require('../../../_images/day_7.png'),
      ];

      var d = new Date();
      var d_do_math = d.setDate(d.getDate()+do_math)
      
      this.setState(
        {
          day: getDayOfYear( d_do_math ),
          weekday: getDay( d_do_math ),
          quote: data[getDayOfYear(d_do_math)-1]['quote'],
          dayimage: images[getDay( d_do_math )-1],
        }
      );
  }

  _shareQuoteOfTheDay = () => {

    this.setState({
      loading: true
   })

   Marker.markText({
      src: this.state.dayimage,
      text: this.state.quote, 
      X: 30,
      Y: 30, 
      color: '#FF0000',
      fontName: 'Arial-BoldItalicMT',
      fontSize: 12,
      shadowStyle: {
          dx: 10.5,
          dy: 20.8,
          radius: 20.9,
          color: '#ff00ff'
      },
      textBackgroundStyle: {
          type: 'stretchX',
          paddingX: 10,
          paddingY: 10,
          color: '#0f0'
      },
      scale: 1, 
      quality: 100
   }).then((res) => {
       this.setState({
          loading: false,
          markResult: res
       })
    
    //alert("the path is"+res)
    // android ios does not need file:// 
    const shareOptions = {
      title: 'Teilen',
      message: 'some message',
      url: 'file://'+res,
  };

    Share.open(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });



   }).catch((err) => {
      console.log(err)
      this.setState({
          loading: false,
          err
      })
   })

  }
  
    render(){
    
    return (
    
    <View>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        
        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,0)}>
          <Text>TODAY</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,-1)}>
          <Text> One day back </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,-2)}>
          <Text> Two days back </Text>
        </TouchableOpacity>

      </View>
    <ScrollView>

    <View>

    <Image
      resizeMode={'cover'}
      style={{ height: Dimensions.get('window').width/2, width: Dimensions.get('window').width }}
      source={this.state.dayimage}
    />

    </View>
        <Text>{"Main"}</Text>
        <Text>DAY OF THE YEAR {this.state.day}</Text>
        <Text>WEEKDAY</Text>
        <Text>{this.state.weekday}</Text>
        <Text>Quote of the Day</Text>
        <Text>{this.state.quote}</Text>
    
    </ScrollView>

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