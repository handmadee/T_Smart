
// Config 3 

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { common } from '../utils/utils';

const API_URL = common.BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
            const { accesstoken } = JSON.parse(token);
            if (accesstoken) {
                config.headers.Authorization = `Bearer ${accesstoken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log({
            error: error
        })
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            try {
                const token = await AsyncStorage.getItem("auth");
                const { refreshtoken } = JSON.parse(token);
                const refreshResponse = await axios.post(`${API_URL}/auth/refresh-token`, {
                    refreshToken: refreshtoken
                });
                const newAuth = { ...JSON.parse(token), accesstoken: refreshResponse.data.data.accessToken };
                await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
                originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
                return axios(originalRequest);
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    throw { response: { status: 401 } };
                }
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

