import { Platform, PermissionsAndroid, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

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
                console.log('Quyền thông báo đã được cấp');
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
                console.log('Quyền thông báo đã được cấp', authStatus);
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