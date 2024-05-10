import ApiClient from "./axios.client";
const axiosClient = ApiClient();

export const getCategoryQuiz = async (data) => {
    const respomse = await axiosClient.get(`/categoryQuiz`);
    return respomse.data;
}

// Lấy quiz theo category
export const getQuizByCategory = async (data) => {
    const respomse = await axiosClient.get(`/categoryQuiz/${data}`);
    return respomse.data;
}

export const getQuiz = async (data) => {
    const respomse = await axiosClient.get(`/quizExam/category/${data}`);
    return respomse.data;
}

// Select theo độ level
export const getQuizByLevel = async (idCategory, level) => {
    const respomse = await axiosClient.get(`/quizExam/level/${idCategory}/${level}`);
    return respomse.data;
}

// Get Quiz by id
export const getQuestion = async (exam) => {
    const respomse = await axiosClient.get(`/quizExam/${exam}`);
    return respomse.data;
}

// Start Tracking
export const startQuiz = async (data) => {
    const respomse = await axiosClient.post(`/trackingQuiz/start`, data);
    return respomse.data;
}
// Finish Tracking
export const FinishQuiz = async (data) => {
    const respomse = await axiosClient.post(`/trackingQuiz/finish`, data);
    return respomse.data;
}

// Thống kế điểm user
export const getScoreUser = async (data) => {
    const respomse = await axiosClient.get(`/trackingQuiz/score/${data}`);
    return respomse.data;
}

// Check ranking user
export const getRankUser = async (data) => {
    const respomse = await axiosClient.get(`/trackingQuiz/ranking/user/${data}`);
    return respomse.data;
}
// Tracking theo tuaanf 

export const getRankWeek = async (data) => {
    const respomse = await axiosClient.get(`/trackingQuiz/ranking/week`);
    return respomse.data;
}

export const getRankFull = async () => {
    const respomse = await axiosClient.get(`/trackingQuiz/ranking`);
    return respomse.data;
}

// Theo dõi số bài quiz người dùng đã làm trong 1 tháng 

export const getQuizbyUser = async (data) => {
    const respomse = await axiosClient.get(`/trackingQuiz/checkQuizInMonth/${data}`);
    return respomse.data;
}