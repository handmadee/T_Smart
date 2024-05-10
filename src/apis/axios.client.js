// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { common } from '../utils/utils';

// const API_URL = common.BASE_URL;

// const axiosInstance = () => {
//     const instance = axios.create({
//         baseURL: API_URL,
//         timeout: 10000,
//     });

//     const setAuthToken = async (config) => {
//         const token = await AsyncStorage.getItem("auth");
//         if (token) {
//             const { accesstoken } = JSON.parse(token);
//             if (accesstoken) {
//                 config.headers.authorization = `Bearer ${accesstoken}`;
//             }
//         }
//         return config;
//     };


//     instance.interceptors.request.use(
//         async (config) => await setAuthToken(config),
//         (error) => Promise.reject(error)
//     );

//     // instance.interceptors.response.use(
//     //     (response) => response,
//     //     async (error) => {
//     //         console.log(error)
//     //         // if (error.response && error.response.status === 401) {
//     //         //     const interceptor = instance.interceptors.response.eject(error.config);
//     //         //     try {
//     //         //         const token = await AsyncStorage.getItem("auth");
//     //         //         const { refreshtoken } = JSON.parse(token);
//     //         //         const url = `${API_URL}/auth/refresh-token`;
//     //         //         const body = `refreshToken=${refreshtoken}`;
//     //         //         const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
//     //         //         const refreshResponse = await axios.post(url, body, { headers });
//     //         //         const newAuth = { ...JSON.parse(token), accesstoken: refreshResponse.data.data.accessToken };
//     //         //         await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
//     //         //         error.response.config.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
//     //         //         return axios(error.response.config);
//     //         //     } catch (err) {
//     //         //         if (err.response && err.response.status === 400) {
//     //         //             throw { response: { status: 401 } };
//     //         //         }
//     //         //         return Promise.reject(err);
//     //         //     } finally {
//     //         //         instance.interceptors.response.use(interceptor);
//     //         //     }
//     //         // }
//     //         // return Promise.reject(error);
//     //     }
//     // );


//     axios.interceptors.response.use(function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response;
//     }, function (error) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         console.log(error)
//         return Promise.reject(error);
//     });

//     return instance;


//     // const get = (path, params) => instance.get(path, { params });
//     // const post = (path, body, headers) => instance.post(path, body, { headers });
//     // const put = (path, body, params) => instance.put(path, body, { params });
//     // const patch = (path, body, params) => instance.patch(path, body, { params });
//     // const del = (path) => instance.delete(path);

//     // return { get, post, patch, put, del };
// };

// export default axiosInstance;



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { common } from '../utils/utils';

const API_URL = common.BASE_URL;

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_URL,
        timeout: 10000,
    });

    const setAuthToken = async (config) => {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
            const { accesstoken } = JSON.parse(token);
            if (accesstoken) {
                config.headers.authorization = `Bearer ${accesstoken}`;
            }
        }
        return config;
    };


    instance.interceptors.request.use(
        async (config) => await setAuthToken(config),
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                const interceptor = instance.interceptors.response.eject(error.config);
                try {
                    const token = await AsyncStorage.getItem("auth");
                    const { refreshtoken } = JSON.parse(token);
                    const url = `${API_URL}/auth/refresh-token`;
                    const body = `refreshToken=${refreshtoken}`;
                    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
                    const refreshResponse = await axios.post(url, body, { headers });
                    const newAuth = { ...JSON.parse(token), accesstoken: refreshResponse.data.data.accessToken };
                    await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
                    error.response.config.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
                    return axios(error.response.config);
                } catch (err) {
                    if (err.response && err.response.status === 400) {
                        throw { response: { status: 401 } };
                    }
                    return Promise.reject(err);
                } finally {
                    instance.interceptors.response.use(interceptor);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default axiosInstance;
