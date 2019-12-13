import React from "react";

//import DateTimePicker from "@react-native-community/datetimepicker";

import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, Button, Switch, TouchableOpacity } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import moment from "moment";
const NOTIFICATION_DATE_FORMAT = "YYYY-MM-DD";
const NOTIFICATION_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
function scheduleLocalNotification(message, date, id, repeatType, payload) {
  
 
  //const fireDate = moment(date, NOTIFICATION_DATE_TIME_FORMAT).toDate();
  let fireDate = moment(date,NOTIFICATION_DATE_TIME_FORMAT);
  if(fireDate.isBefore(moment())){
    fireDate = fireDate.add(1,'days').toDate();
  }else{
    fireDate = fireDate.toDate();
  }
  
  const notification = {
    id: id + "", //for android cancel notification (must be stringified number)
    message,
    number: 1, //necessary for iOS cancellation (not sure why)
    date: fireDate,
    repeatType: repeatType,
    popInitialNotification: true,
    //for ios only
    userInfo: {
      id: id, //for ios cancel notfication (can be any string)
      ...payload
    },
    //for android only
    data: JSON.stringify(payload)
  };

  PushNotification.localNotificationSchedule(notification);
}
function cancelNotification(id) {
  PushNotification.cancelLocalNotifications({ id });
}
class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ALARM_TIME: false,
      NOTIFICATION_CHECK: false,
      alarmTimeDate: new Date()
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Einstellungen"
    };
  };
  changeAlarm = () => {
    if (this.state.NOTIFICATION_CHECK) {
      PushNotification.cancelAllLocalNotifications();
      PushNotification.cancelLocalNotifications({ id: "1" });
      let alarmDate =
        moment().format(NOTIFICATION_DATE_FORMAT) + " " + this.state.ALARM_TIME;

        
      scheduleLocalNotification(
        "HEUTE ist Mein bester Tag!",
        alarmDate,
        1,
        "day",
        { alarmID: 1 }
      );
    } else {
      PushNotification.cancelAllLocalNotifications();
      PushNotification.cancelLocalNotifications({ id: "1" });
    }
  };
  handleDatePicked = ( ALARM_TIME) => {
    ALARM_TIME = moment(ALARM_TIME).format("HH:mm");

    this.setState(
      {
        alarmTimeDate: moment()
          .hours(ALARM_TIME.split(":")[0])
          .minutes(ALARM_TIME.split(":")[1])
          .toDate(),
        ALARM_TIME,
        isDateTimePickerVisible: false
      },
      () => {
        AsyncStorage.setItem("ALARM_TIME", ALARM_TIME);
        this.changeAlarm();
      }
    );
  };

  
  onNotificationValueChange = NOTIFICATION_CHECK => {
   
    this.setState(
      {
        NOTIFICATION_CHECK
      },
      () => {
        AsyncStorage.setItem(
          "NOTIFICATION_CHECK",
          JSON.stringify(NOTIFICATION_CHECK)
        );
        if (NOTIFICATION_CHECK) {
        } else {
          PushNotification.cancelAllLocalNotifications();
          PushNotification.cancelLocalNotifications({ id: "1" });
        }
      }
    );
  };
  async componentDidMount() {
    let ALARM_TIME = await AsyncStorage.getItem("ALARM_TIME");
    let NOTIFICATION_CHECK = await AsyncStorage.getItem("NOTIFICATION_CHECK");
    
    if (!ALARM_TIME) {
      ALARM_TIME = moment().format("HH:mm");
    }
    this.setState({
      alarmTimeDate: moment()
        .hours(ALARM_TIME.split(":")[0])
        .minutes(ALARM_TIME.split(":")[1])
        .toDate(),

      ALARM_TIME,
      NOTIFICATION_CHECK: NOTIFICATION_CHECK == "true"
    });
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  renderDateTime() {
    if (this.state.ALARM_TIME) {
      return [
        <TouchableOpacity
          style={{ flex: 1 }}
          key="1"
          onPress={() => this.setState({ isDateTimePickerVisible: true })}
        >
          {
            <Text
              style={{
                color: "black",
                textAlign: "right",
                fontFamily: "ptsans",
                fontSize: 16,
                color: "#23859e"
              }}
            >
              {this.state.ALARM_TIME} Uhr
            </Text>
          }
        </TouchableOpacity>,
        <View key="2">

            <DateTimePicker
            mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          
        </View>
      ];
    } else {
      return null;
    }
  }
  render() {
    const { show, date, mode } = this.state;
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20
          }}
        >
          <Text style={{ color: "black", fontFamily: "ptsans", fontSize: 16 }}>
            Benachrichtigungen
          </Text>

          <Switch
            onValueChange={this.onNotificationValueChange}
            value={this.state.NOTIFICATION_CHECK}
          />
        </View>

        {this.state.NOTIFICATION_CHECK && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                flex: 1,
                color: "black",
                fontFamily: "ptsans",
                fontSize: 16
              }}
            >
              Benachrichtigungszeit
            </Text>
            {this.renderDateTime()}
          </View>
        )}
      </View>
    );
  }
}

export default SettingsScreen;
