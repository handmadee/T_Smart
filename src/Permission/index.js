import { Platform, PermissionsAndroid, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import PushNotificationService from './../services/notifications/PushNotificationService';
const notificationService = new PushNotificationService();

export async function requestPermissionVip() {
    notificationService.createChannel('default');
    notificationService.createChannel('course');
    notificationService.createChannel('application');
    notificationService.localNotification('default', 'Chúc mừng bạn có 1 buổi học trên app thật là vui vẻ 😍');
    notificationService.messagingNotification();
}
async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Yêu cầu quyền thông báo',
                    message: 'Ứng dụng cần truy cập thông báo để hoạt động.',
                    buttonNeutral: 'Hỏi sau',
                    buttonNegative: 'Hủy',
                    buttonPositive: 'Đồng ý',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                requestPermissionVip();
            } else {
                console.log('Quyền thông báo bị từ chối');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}
async function requestNetworkPermission() {
    if (Platform.OS === 'ios') {
        messaging()
            .requestPermission()
            .then((authStatus) => {
                requestPermissionVip();
            })
            .catch((err) => {
                console.log('Quyền thông báo bị từ chối', err);
            });
    }
}


export async function requestPermission() {
    await requestNotificationPermission();
    await requestNetworkPermission();
}