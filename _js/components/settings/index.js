import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  
  View,Text,Button,Switch,TouchableOpacity
} from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
const NOTIFICATION_DATE_FORMAT = 'YYYY-MM-DD';
const NOTIFICATION_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
function scheduleLocalNotification(message, date, id, repeatType,payload) {

    //message: type String
  
    console.log("payload enterd scheduled",payload);
    //date: type String  format 'YYYY-MM-DD HH:mm' (NOTIFICATION_DATE_TIME_FORMAT)
  
    //construct the notification parameters
     const fireDate = moment(date, NOTIFICATION_DATE_TIME_FORMAT).toDate();
    /*const fireDate = moment()
      //.add(3, 'seconds')
      .toDate();*/
    const notification = {
      id: id+"", //for android cancel notification (must be stringified number)
      message,
      number: 1, //necessary for iOS cancellation (not sure why)
      date: fireDate,
      repeatType: repeatType,
      popInitialNotification: true,
      //for ios only
      userInfo: {
        id: id, //for ios cancel notfication (can be any string)
        ...payload,
      },
      //for android only
      data: JSON.stringify(payload),
    };
    
    console.log("called schedule2",notification);
    console.log("payload",payload);
    //schedule the notification
    PushNotification.localNotificationSchedule(notification);
  }
  function cancelNotification(id){
    console.log("called cancel",id);
    PushNotification.cancelLocalNotifications({id});
}
class SettingsScreen extends React.Component {
    
    constructor(props) {
		super(props);
        
		this.state = {
			ALARM_TIME: false,
			NOTIFICATION_CHECK: false,
			alarmTimeDate: new Date()
		}
	}
      changeAlarm = () => {
		if (this.state.NOTIFICATION_CHECK ) {
			
				//let alarmID = this.state.DAYS_OF_WEEK[i].id;
				
                PushNotification.cancelAllLocalNotifications();
                PushNotification.cancelLocalNotifications({id:"1"});
					let alarmDate = moment()
						.format(NOTIFICATION_DATE_FORMAT) + " " + this.state.ALARM_TIME;
					scheduleLocalNotification(
						"alarmText  " ,
                        alarmDate,
                        1,
                        'day',
                        { alarmID:1 }

					);
					//console.log("Alarm geändert für " + alarmDate + " " + alarmID + " " + dayName);
				

			
		}else{
            PushNotification.cancelAllLocalNotifications();
            PushNotification.cancelLocalNotifications({id:"1"});
        }

	}
      handleDatePicked = (event,ALARM_TIME) => {

		ALARM_TIME = moment(ALARM_TIME).format("HH:mm");

		this.setState({
			alarmTimeDate: moment().hours(ALARM_TIME.split(":")[0]).minutes(ALARM_TIME.split(":")[1]).toDate(),
			ALARM_TIME,
			isDateTimePickerVisible: false
		}, () => {
			AsyncStorage.setItem("ALARM_TIME", ALARM_TIME);
			this.changeAlarm();
		});

	}

	hideDateTimePicker = () => {

		this.setState({ isDateTimePickerVisible: false })
	}
	onNotificationValueChange = (NOTIFICATION_CHECK) => {
		console.log(NOTIFICATION_CHECK);
		this.setState({
			NOTIFICATION_CHECK
		}, () => {

			AsyncStorage.setItem("NOTIFICATION_CHECK", JSON.stringify(NOTIFICATION_CHECK));
			if (NOTIFICATION_CHECK) {
				
			} else {
                PushNotification.cancelAllLocalNotifications();
                PushNotification.cancelLocalNotifications({id:"1"});
			}
		});

	}
      async componentDidMount(){
        let ALARM_TIME = await AsyncStorage.getItem('ALARM_TIME');
        let NOTIFICATION_CHECK = await AsyncStorage.getItem('NOTIFICATION_CHECK');
        console.log("notification check");  
        console.log(typeof NOTIFICATION_CHECK);
        if (!ALARM_TIME) {
            ALARM_TIME = moment().format("HH:mm")
        }
        this.setState({
            alarmTimeDate: moment().hours(ALARM_TIME.split(":")[0]).minutes(ALARM_TIME.split(":")[1]).toDate(),
            
            ALARM_TIME,
            NOTIFICATION_CHECK: NOTIFICATION_CHECK=='true',
            
        });
      }
      renderDateTime(){
        if(this.state.ALARM_TIME){
            return [<TouchableOpacity key="1" onPress={() => this.setState({ isDateTimePickerVisible: true })}>
            {<Text>
                {this.state.ALARM_TIME}
            </Text>}
            </TouchableOpacity>,
            <View key="2">{this.state.isDateTimePickerVisible?<DateTimePicker
                
                
                onChange={this.handleDatePicked}
               
                value={this.state.alarmTimeDate}
                mode="time"
                />:null}
            </View>]
        }else{
            return null;
        }
      }
    render() {
        const { show, date, mode } = this.state;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
          
				<Switch
						onValueChange={this.onNotificationValueChange} value={this.state.NOTIFICATION_CHECK}
				/>
         

                    {this.state.NOTIFICATION_CHECK &&<View style={{marginTop:50}}>
                    {this.renderDateTime()}

                    </View>}
        
  
        </View>
      );
    }
  }

  export default SettingsScreen;