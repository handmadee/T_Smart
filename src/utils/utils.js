import { Platform } from "react-native"
const IOS_BASE_URL = 'http://localhost:3052/v1/api';
const ANDROID_BASE_URL = 'http://10.0.2.2:3052/v1/api';
export const common = {
    // Resbase
    BASE_URL: 'https://tsmart-com.onrender.com/v1/api',
    // DEV
    // BASE_URL: Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL,
}
