import axiosClient from "./axios.client";;

// Get all courses
export const getCourses = async (page = 1, limit = 10) => {
    try {
        const response = await axiosClient().get(`/course/?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        throw error;
    }
};

// Get course by id
export const getCourseById = async (id) => {
    try {
        const response = await axiosClient().get(`/course/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch course with id ${id}:`, error);
        throw error;
    }
};

// Create a new course
export const createCourse = async (courseData) => {
    try {
        const response = await axiosClient().post('/course', courseData);
        return response.data;
    } catch (error) {
        console.error('Failed to create course:', error);
        throw error;
    }
};

// Update a course
export const updateCourse = async (id, updatedData) => {
    try {
        const response = await axiosClient().put(`/course/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Failed to update course with id ${id}:`, error);
        throw error;
    }
};

// Delete a course
export const removeCourse = async (id) => {
    try {
        await axiosClient().delete(`/course/${id}`);
        return true; // Indicate success if the request succeeds
    } catch (error) {
        console.error(`Failed to delete course with id ${id}:`, error);
        throw error;
    }
};



// Search for courses
export const searchCourse = async (keyword) => {
    try {
        const response = await axiosClient().get('/search', {
            params: {
                q: keyword
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to search courses:', error);
        throw error;
    }
};

// Get page course 
export const getPageCourse = async (page = 1) => {
    try {
        const response = await axiosClient().get(`/course/?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch page course:', error);
        throw error;
    }
};

// Get all categories
export const getCategory = async () => {
    try {
        const response = await axiosClient().get('/category');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

// Get category by id
export const getCategoryById = async (id) => {
    try {
        const response = await axiosClient().get(`/category/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch category with id ${id}:`, error);
        throw error;
    }
};

// Get notifications
export const getNotification = async () => {
    try {
        const response = await axiosClient().get('/notificationList');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
        throw error;
    }
};

// Get user information by id
export const checkInforUser = async (id) => {
    try {
        const response = await axiosClient().get(`/auth/user/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch user information for user with id ${id}:`, error);
        throw error;
    }
};

// Import user information
export const importInfor = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axiosClient().post('/user', userData, config);
        return response.data;
    } catch (error) {
        console.error('Failed to import user information:', error);
        throw error;
    }
};

// Edit user information by id
export const editInfor = async (id, userData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axiosClient().put(`/user/${id}`, userData, config);
        return response.data;
    } catch (error) {
        console.error(`Failed to edit user information for user with id ${id}:`, error);
        throw error;
    }
};

// get popup 
export const getPopup = async () => {
    try {
        const response = await axiosClient().get('/popup');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch popup:', error);
        throw error;
    }
};