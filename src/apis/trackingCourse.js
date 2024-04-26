import { ApiClient } from "./axios.client";
const axiosClient = ApiClient();

export const trackingCourseLearn = async (data) => {
    return await axiosClient.get(`/trackingLearn/${data}`);
}
export const trackingCourseFinsnish = async (data) => {
    return await axiosClient.get(`/trackingFinish/${data}`);
}

export const createTracking = async (data) => {
    return await axiosClient.post('/tracking', data)
};

export const getTracking = async (idAccount, idCourse) => {
    return await axiosClient.get(`/tracking/?idCourse=${idCourse}&idAccount=${idAccount}`)
};

export const addLessonToTracking = async (data) => {
    return await axiosClient.put('/tracking', data)
}

