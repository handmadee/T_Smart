import PushNotificationService from './../../../../src/services/notifications/PushNotificationService';
const notificationService = new PushNotificationService();


const days = 60 * 60 * 24 * 1000;
export default class notificationServiceCourse {
    // Thông báo học tập trên app
    static createLearningNotification() {
        notificationService.pushNotificationSchedule('course', 'Đã 3 ngày rồi bạn vẫn chưa vào app học tập nè', 3 * days);
    }
    // Thông báo nhắc nhở đăng kí khóa học
    static createRegisterCourseNotification() {
        notificationService.pushNotificationSchedule('course', 'Bạn ơi ! Bạn đã liên hệ với giảng viên để đăng kí khoá chưa 📖 ', 5000);
    }

    // Thông báo học khoá học name  
    static createCourseNotification(name) {
        notificationService.pushNotificationSchedule('course', `Bạn ơi ! Đừng quên học khoá học ${name} để hoàn thành chỉ tiêu nhé`, days, 7);
    }

    // Chúc mừng 
    static createCongratulationNotification(name) {
        notificationService.localNotification('course', `Chúc mừng bạn đã hoàn thành khoá học ${name} 🎉`);
    }


}