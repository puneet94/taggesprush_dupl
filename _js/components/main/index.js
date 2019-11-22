
import React from 'react';
/* react-native-get-location is outdated, does not work on iOS */
/* import GetLocation from 'react-native-get-location' */

import {
    StyleSheet,
  View,Text,Button,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

import {  Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { getDay, getDayOfYear } from 'date-fns'
import * as data2019 from '../../../data_2019.json';
import * as data2020 from '../../../data_2020.json';
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
      title: "Main",
      headerRight: 
      <View style={{flexDirection: 'row'}}>
      <View>
      <TouchableOpacity onPress={ () => { navigation.getParam('_shareQuoteOfTheDay')(); }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../_images/basics/icon_share.png')}
          />
      </TouchableOpacity>
        
        </View>
      <Menu
      style={{marginRight: 10,}}
      onSelect={value =>  navigation.navigate(value)}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} >
          
        <Image
            style={{width: 24, height: 24}}
            source={require('../../../_images/basics/icon_dots.png')}
          />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{width: 200, marginTop:8, backgroundColor: 'white'}}>
        <MenuOption value={'Settings'} style={{width: 200,}}>
            <Text>settings</Text>
          </MenuOption>
          <View style={{backgroundColor: '#cccccc', height: 1}}></View>
          <MenuOption value={'Imprint'} style={{width: 200,}}>
            <Text>imprint</Text>
          </MenuOption>

          <View style={{backgroundColor: '#cccccc', height: 1}}></View>
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
        require('../../../_images/day_1.jpg'),
        require('../../../_images/day_2.jpg'),
        require('../../../_images/day_3.jpg'),
        require('../../../_images/day_4.jpg'),
        require('../../../_images/day_5.jpg'),
        require('../../../_images/day_6.jpg'),
        require('../../../_images/day_7.jpg'),
      ];

      var d = new Date();
      var d_do_math = d.setDate(d.getDate()+do_math)
      
      var cmm = d.getFullYear();
      if (cmm == 2019) {
        var data = data2019;
      } else {
        var data = data2020;
      }

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
      text: this.state.quote.replace(/(\S+\s*){1,7}/g, "$&\n"),
      position: 'bottomCenter', 
      color: '#968154',
      fontName: 'Arial-BoldItalicMT',
      fontSize: 36,
      textBackgroundStyle: {
          type: 'stretchX',
          paddingX: 0,
          paddingY: 0,
          color: '#fff',
      },
      scale: 1, 
      quality: 100
   }).then((res) => {
       this.setState({
          loading: false,
          markResult: res
       })
    
    const shareOptions = {
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
    
    <View style={{flex:1}}>

      <View style={{flexDirection: 'row',
            justifyContent:'space-between',
            backgroundColor:'#23859e',
            height: 40,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,}}> 
        
        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,0)}>
          <Text style={{color: 'white',fontFamily:'ptsans',fontSize: 16}}>Today</Text>
        </TouchableOpacity> 

        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,-1)}>
          <Text style={{color: 'white',fontFamily:'ptsans',fontSize: 16}}>One day back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,-2)}>
          <Text style={{color: 'white',fontFamily:'ptsans',fontSize: 16}}>Two day back</Text>
        </TouchableOpacity>

      </View>

    <ScrollView style={{flex:1}}>



    <Image
      resizeMode={'contain'}
      style={{ height: Dimensions.get('window').width, width: Dimensions.get('window').width }}
      source={this.state.dayimage}
    />


          <Text style={{color: '#968154', fontFamily:'ptsans', fontSize: 18, textAlign:'center', lineHeight: 25, padding: 15, top: -80}}>{this.state.quote}</Text>

    
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