
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
import { getDay, getDayOfYear,getISODay } from 'date-fns'
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
      title: "Paul des Tages",
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
            <Text style={{fontFamily:'ptsans',fontSize: 16, color: '#968154'}}>Einstellungen</Text>
          </MenuOption>
          <View style={{backgroundColor: '#cccccc', height: 1}}></View>
          <MenuOption value={'Imprint'} style={{width: 200,}}>
            <Text style={{fontFamily:'ptsans',fontSize: 16, color: '#968154'}}>Impressum</Text>
          </MenuOption>

          <View style={{backgroundColor: '#cccccc', height: 1}}></View>
          <MenuOption value={'PrivacyPolicy'} style={{width: 200}}>
            <Text style={{fontFamily:'ptsans',fontSize: 16, color: '#968154'}}>Datenschutz</Text>
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

  _setQuoteOfTheDay = (navIndex) => {

      var images = [
        require('../../../_images/day_1.jpg'),
        require('../../../_images/day_2.jpg'),
        require('../../../_images/day_3.jpg'),
        require('../../../_images/day_4.jpg'),
        require('../../../_images/day_5.jpg'),
        require('../../../_images/day_6.jpg'),
        require('../../../_images/day_7.jpg'),
      ];

      var weekDays = [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag'
      ]
      
      var today = new Date().setDate(new Date().getDate())
      
      var oneDayBack = new Date().setDate(new Date().getDate() -1);

      var twoDayBack = new Date().setDate(new Date().getDate() -2);
      
      var cmm = new Date().getFullYear();

      if (cmm == 2019) {
        var data = data2019;
      } else {
        var data = data2020;
      }
  
      if(navIndex == 1 ) {
        
        this.setState(
          {
          fontWeightnavIndex0: 'normal',
          fontWeightnavIndex1: 'bold',
          fontWeightnavIndex2: 'normal',
          day: getDayOfYear(oneDayBack),
          weekday: getISODay(oneDayBack),
          quote: data[getDayOfYear(oneDayBack)-1]['quote'],
          dayimage: images[getISODay( oneDayBack)-1],
        })
      } else if (navIndex == 2) {
        this.setState(
          {
          fontWeightnavIndex0: 'normal',
          fontWeightnavIndex1: 'normal',
          fontWeightnavIndex2: 'bold',
          day: getDayOfYear( twoDayBack ),
          weekday: getISODay( twoDayBack ),
          quote: data[getDayOfYear(twoDayBack)-1]['quote'],
          dayimage: images[getISODay(twoDayBack)-1],
        })
      }
      else {
        this.setState(
          {
          fontWeightnavIndex0: 'bold',
          fontWeightnavIndex1: 'normal',
          fontWeightnavIndex2: 'normal',
          day: getDayOfYear( today ),
          weekday: getISODay( today ),
          quote: data[getDayOfYear(today)-1]['quote'],
          dayimage: images[getISODay(today)-1],
        })
      }

      this.setState(
        {
          today: weekDays[getISODay( today )-1],
          oneDayBack: weekDays[getISODay( oneDayBack )-1],
          twoDayBack: weekDays[getISODay( twoDayBack )-1]
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
        <View style={{flex:1,borderRightColor: 'white', borderRightWidth: 1,}} >
          <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,0)}>
            <Text style={{color: 'white', textAlign:'center', fontFamily:'ptsans',fontSize: 16, fontWeight: this.state.fontWeightnavIndex0}}>Heute</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex:1,borderRightColor: 'white', borderRightWidth: 1}} >
          <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,1)}>
            <Text style={{color: 'white', textAlign:'center', fontFamily:'ptsans',fontSize: 16,fontWeight: this.state.fontWeightnavIndex1}}>{this.state.oneDayBack}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{flex:1,}} >
          <TouchableOpacity onPress={ this._setQuoteOfTheDay.bind(this,2)}>
            <Text style={{color: 'white', textAlign:'center', fontFamily:'ptsans', fontSize: 16,fontWeight: this.state.fontWeightnavIndex2}}>{this.state.twoDayBack}</Text>
          </TouchableOpacity>
        </View>
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