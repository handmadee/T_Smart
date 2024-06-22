import axiosClient from "./axios.client";

export const pushFcmToken = async (data) => {
    try {
        await axiosClient.post('/fcmtoken', data);
    } catch (error) {
        console.error(error)
    }
}
export const deleteFcmToken = async (id) => {
    return await axiosClient.delete(`/fcmtoken/account/${id}`);
}
