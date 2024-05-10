// authApi.js
import axiosClient from "./axios.client";;
import { common } from '../utils/utils';

// Đăng nhập
export const login = async (credentials) => {
    try {
        const response = await axiosClient().post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data.data?.message || 'Login failed');
    }
};

// Đăng ký
export const register = async (userData) => {
    try {
        const response = await axiosClient().post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.data?.message || 'Registration failed');
    }
};

// Kiểm tra token
export const checkToken = async (token) => {
    try {
        const response = await fetch(`${common?.BASE_URL}/auth/verify-token`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error)
        console.error('Token Validate Error:', error);
        throw error;
    }
};

// Làm mới token
export const refreshToken = async (refreshToken) => {
    try {
        const response = await axiosClient().post('/auth/refresh-token', { refreshToken });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.data?.message || 'Token refresh failed');
    }
};

// Logout
export const logout = async (refreshToken) => {
    try {
        const response = await axiosClient().post('/auth/logout', { refreshToken });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.da?.data?.message || 'Logout failed');
    }
};

// change password

export const changePassword = async (data) => {
    try {
        const response = await axiosClient().put('/auth/changePassword', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.data?.message || 'Change password failed');
    }
};

// findUserByUserName

export const findUserByUserName = async (data) => {
    try {
        const response = await axiosClient().get(`/findUserName/${data}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.data?.message || 'Find user failed');
    }
};

// changePasswordByUserName 
export const changePassByUserName = async (data) => {
    try {
        const response = await axiosClient().put('/authChangeUser', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.data?.message || 'Change password failed');
    }
};
