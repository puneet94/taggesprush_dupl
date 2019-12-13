import {StyleSheet, Platform, Dimensions} from 'react-native';
import appVars from './appVars';


module.exports = StyleSheet.create({

    subMenuContainer: {width: 150, marginTop:13, backgroundColor: 'white'},
    subMenuChild: {width: 150},
    subMenuText: {fontFamily: appVars.fontText,fontSize: 16, paddingLeft: 5,color: '#968154'},
    subMenuDivider: {backgroundColor: '#cccccc', height: 1},

    tabMenu: {flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:'#23859e',
    height: 40,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,},

    tabMenuItem: 
        {flex:1,borderRightColor: 'white', borderRightWidth: 1,},
    tabMenuText: {
        color: 'white', textAlign:'center', fontFamily: appVars.fontText,fontSize: 16
    },

    quoteText: {color: '#968154', fontFamily: appVars.fontText, fontSize: 18, textAlign:'center', lineHeight: 25, padding: 15, top: -80},
});