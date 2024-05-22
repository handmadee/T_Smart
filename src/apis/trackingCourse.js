import axiosClient from "./axios.client";
// const axiosClient = ApiClient();

export const trackingCourseLearn = async (data) => {
    return await axiosClient.get(`/trackingLearn/${data}`);
}
export const trackingCourseFinsnish = async (data) => {
    return await axiosClient.get(`/trackingFinish/${data}`);
}

export const createTracking = async (data) => {
    const response = await axiosClient.post('/tracking', data);
    return response;
};

export const getTracking = async (idAccount, idCourse) => {

    // Get Tracking
    return await axiosClient.get(`/tracking/?idCourse=${idCourse}&idAccount=${idAccount}`)
};

export const addLessonToTracking = async (data) => {
    return await axiosClient.put('/tracking', data)
}


// Top Course 
export const getTopCourse = async () => {
    return await axiosClient.get('/topCourse')
}
// Low Course
export const getLowCourse = async () => {
    return await axiosClient.get('/lowCourse')
}
