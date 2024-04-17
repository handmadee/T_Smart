// axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { common } from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from './authApi';
const baseURL = common.BASE_URL;

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: params => queryString.stringify(params),
});

// Interceptor request
axiosClient.interceptors.request.use(async (config) => {
    const auth = await AsyncStorage.getItem('auth');
    if (auth) {
        try {
            const token = JSON.parse(auth).accesstoken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error parsing auth:', error);
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor response
axiosClient.interceptors.response.use(response => {
    if (response && response.status >= 200 && response.status < 300) {
        return response.data;
    }
    throw new Error('Request failed');
}, async error => {
    if (error.response && error.response.status === 401) {
        const auth = await AsyncStorage.getItem('auth');
        if (auth) {
            const token = JSON.parse(auth).accesstoken;
            const newToken = await refreshToken(token);
            await AsyncStorage.setItem('auth', JSON.stringify({ ...JSON.parse(auth), accesstoken: newToken }));
            error.config.headers['Authorization'] = 'Bearer ' + newToken;
            return axiosClient(error.config);
        }
    }
    return Promise.reject(error);
});

export default axiosClient;