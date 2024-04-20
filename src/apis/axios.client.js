// import axios from 'axios';
// import queryString from 'query-string';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { refreshToken } from './authApi';
// import { common } from '../utils/utils';

// const baseURL = common.BASE_URL;
// const BEARER_TOKEN_PREFIX = 'Bearer ';

// const axiosClient = axios.create({
//     baseURL,
//     paramsSerializer: params => queryString.stringify(params),
// });

// axiosClient.interceptors.request.use(async (config) => {
//     try {
//         const auth = await AsyncStorage.getItem('auth');
//         console.log({
//             auth: auth
//         })
//         if (auth?.accesstoken) {
//             const { accesstoken } = JSON.parse(auth);
//             if (accesstoken) {
//                 config.headers.Authorization = `${BEARER_TOKEN_PREFIX}${accesstoken}`;
//             }
//         } else {
//             throw new Error('Authentication token not found');
//         }
//     } catch (error) {
//         console.error('Error parsing auth:', error);
//         return Promise.reject(error);
//     }
//     return config;
// });

// axiosClient.interceptors.response.use(
//     response => response.data,
//     async error => {
//         const { response: errorResponse } = error;
//         if (errorResponse && errorResponse.status === 401) {
//             try {
//                 const auth = await AsyncStorage.getItem('auth');
//                 const { accesstoken } = auth ? JSON.parse(auth) : {};
//                 if (accesstoken) {
//                     const newToken = await refreshToken(accesstoken);
//                     const newAuth = { ...JSON.parse(auth), accesstoken: newToken };
//                     await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
//                     error.config.headers['Authorization'] = `${BEARER_TOKEN_PREFIX}${newToken}`;
//                     return axiosClient(error.config);
//                 }
//             } catch (refreshError) {
//                 console.error('Error refreshing token:', refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosClient;



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { common } from '../utils/utils';

const API_URL = common.BASE_URL;

export const ApiClient = () => {
    const api = axios.create({
        baseURL: API_URL,
        // headers: {
        //     "Content-Type": "application/json",
        // },
    });

    api.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem("auth");
            if (token?.accesstoken) {
                config.headers.Authorization = `${token?.accesstoken}`
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401 && AsyncStorage.getItem("auth")) {
                const interceptor = api.interceptors.response.eject(error.config);
                try {
                    const token = await AsyncStorage.getItem("auth");
                    const refreshToken = token?.refreshtoken;
                    const url = `${API_URL}/auth/refresh-token`
                    const body = { refreshToken: refreshToken };
                    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
                    const response = await axios.post(url, body, { headers: headers })
                    const auth = await AsyncStorage.getItem('auth');
                    const newAuth = { ...JSON.parse(auth), accesstoken: response.data.data.accessToken, refreshToken: response.data.data.refreshToken };
                    await AsyncStorage.setItem('auth', JSON.stringify(newAuth));

                    error.response.config.headers["Authorization"] = "Bearer " + response.data.data.accessToken;

                    return axios(error.response.config);
                } catch (err) {
                    if (err.response.status === 400) {
                        throw { response: { status: 401 } };
                    }
                    return Promise.reject(err);
                } finally {
                    api.interceptors.response.use(interceptor);
                }
            }
            return Promise.reject(error);
        }
    );

    const get = (path, params) => api.get(path, params);
    const post = (path, body, headers) => api.post(path, body, headers);
    const put = (path, body, params) => api.put(path, body, params);
    const patch = (path, body, params) => api.patch(path, body, params);
    const del = (path) => api.delete(path);


    return { get, post, patch, put, del };
};