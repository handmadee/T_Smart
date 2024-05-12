// news API 
import axiosClient from "./axios.client";
// const axiosClient = ApiClient();

export const getNewsPage = async (page = 1, limit = 10) => {
    try {
        const response = await axiosClient.get(`/news/?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        throw error;
    }
};

export const getNews = async () => {
    try {
        const response = await axiosClient.get(`/news`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        throw error;
    }
};


