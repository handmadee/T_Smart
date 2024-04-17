import axiosClient from "./axios.client";



// Đăng nhập
export const login = async (credentials) => {
    console.log(credentials)
    try {
        const response = await axiosClient.post('/auth/login', credentials);
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message || 'Login failed');
    }
};

// Đăng ký
export const register = async (userData) => {
    try {
        const response = await axiosClient.post('/auth/signup', userData);
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error || 'Registration failed');
    }
};

// Kiểm tra token
export const checkToken = async (token) => {
    try {
        console.log(`Bearer ${token}`)
        const response = await axiosClient.post('/auth/verify-token', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Token validation failed');
    }
};


// Làm mới token
export const refreshToken = async (refreshToken) => {
    try {
        const response = await axiosClient.post('/auth/refresh-token', { refreshToken });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Token refresh failed');
    }
};

// Logout
export const logout = async (refreshToken) => {
    try {
        const response = await axiosClient.post('/auth/logout', { refreshToken });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Logout failed');
    }
};