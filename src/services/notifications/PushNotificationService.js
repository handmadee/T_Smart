import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { deleteFcmToken, pushFcmToken } from "../../apis/fcmApi";
import { Alert } from "react-native";


class PushNotificationService {
    constructor() {
        // config notification
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
        // Channel notification
        this.createChannel("app");
    }

    createChannel(channel) {
        PushNotification.createChannel(
            {
                channelId: `${channel}`,
                channelName: `${channel}`,
                channelDescription: "Default message",
                playSound: true,
                soundName: "default",
                // importance: "medium",
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`)
        );
    }

    localNotification(channel, message) {
        PushNotification.localNotification({
            channelId: `${channel}`,
            title: "Trung tâm Tsmart",
            message: `${message}`,
            smallIcon: "ic_notification",
            largeIcon: "ic_launcher",
        });
    }
    pushNotificationSchedule(channel, message, date = 0, repeatTime = 0) {
        PushNotification.localNotificationSchedule({
            channelId: `${channel}`,
            title: "Trung tâm Tsmart",
            message: `${message}`,
            date: new Date(Date.now() + date),
            allowWhileIdle: true,
            repeatTime: repeatTime,
            smallIcon: "ic_notification",
            largeIcon: "ic_launcher",
        });
    }
    // messaging online 
    messagingNotification() {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            // Hiển thị thông báo tùy chỉnh
            const image = remoteMessage.notification?.android?.imageUrl
            PushNotification.localNotification({
                channelId: "app",
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body,
                bigPictureUrl: image,
                smallIcon: "ic_notification",
                largeIcon: "ic_launcher",
            });

        });
        // Xử lý thông báo khi ứng dụng đang mở
        messaging().onMessage(async remoteMessage => {
            console.log('Message handled in the foreground!', remoteMessage);

            // Hiển thị thông báo tùy chỉnh
            PushNotification.localNotification({
                channelId: "application",
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body,
                bigPictureUrl: remoteMessage.notification?.android?.imageUrl,
                smallIcon: "ic_notification",
                largeIcon: "ic_launcher",
            });
        });
    }
    // Lấy token fcm
    async getFcmToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            console.log('fcmToken', fcmToken)
            if (fcmToken) {

                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log('fcmToken', fcmToken)
        return fcmToken;
    }
    // Lưu token fcm
    async saveFcmToken(id) {
        const fcmToken = await this.getFcmToken();
        console.log('fcmToken', fcmToken)
        if (fcmToken) {
            await pushFcmToken({
                accountId: id,
                fcmToken: fcmToken
            });
        }
    }
    // Xóa token fcm
    async removeFcmToken(id) {
        await AsyncStorage.removeItem('fcmToken');
        try {
            await deleteFcmToken(id);
        } catch (error) {
            Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại sau');
        }

    }
}

export default PushNotificationService;
