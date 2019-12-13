import {
    Platform,
    Dimensions,
    processColor
  } from 'react-native';

if(Platform.OS === 'android') {
    var fontMain = "Brandon_bld";
    var fontText = "ptsans";
  } else {
    // ios
    var fontMain= "BrandonGrotesque-Bold";
    var fontText = "PTsans";
}

module.exports = {

    fontText: fontText,
    
}