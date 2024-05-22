
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import './src/language/en.config';
import { requestPermission } from './src/Permission';
import PushNotificationService from './src/services/notifications/PushNotificationService';
const notificationService = new PushNotificationService();

requestPermission();
notificationService.getFcmToken();

AppRegistry.registerComponent(appName, () => App);

