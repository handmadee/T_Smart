import axiosClient from "./axios.client";

// Get all courses
export const getCourses = async (page = 1, limit = 10) => {
    return await axiosClient.get(`/course?page=${page}&limit=${limit}`);
};

// Get course by id
export const getCourseById = async (id) => {
    return await axiosClient.get(`/course/${id}`);
};

// Create a new course
export const createCourse = async (courseData) => {
    return await axiosClient.post('/course', courseData);
};

// Update a course
export const updateCourse = async (id, updatedData) => {
    return await axiosClient.put(`/course/${id}`, updatedData);
};
// Delete a course
export const removeCourse = async (id) => {
    return await axiosClient.delete(`/course/${id}`);
};

// Search  

export const searchCourse = async (keyword) => {
    return await axiosClient.get(`/search?q=${keyword}`);
}

// Category 

export const getCategory = async () => {
    return await axiosClient.get('/category');
}


// Get Category by id
export const getCategoryById = async (id) => {
    return await axiosClient.get(`/category/${id}`);
};


// notifiaction 

export const getNotification = async () => {
    return await axiosClient.get('/notificationList');
}

// Check Infor User 
export const checkInforUser = async (id) => {
    return await axiosClient.get(`/auth/user/${id}`);
}

//  import Infor 
export const importInfor = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axiosClient.post(`/user`, data, config);
        return response;
    } catch (error) {
        console.error(`Failed to update information for user with id ${id}: ${error}`);
        throw error;
    }
}

// edit Infor 
export const editInfor = async (id, data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axiosClient.put(`/user/${id}`, data, config);
        return response;
    } catch (error) {
        console.error(`Failed to update information for user with id ${id}: ${error}`);
        throw error;
    }
};