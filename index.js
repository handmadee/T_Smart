
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import './src/language/en.config';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!'),
        console.log(remoteMessage)
});

messaging().onNotificationOpenedApp(async remoteMessage => {


    console.log(remoteMessage.data)
});



AppRegistry.registerComponent(appName, () => App);
