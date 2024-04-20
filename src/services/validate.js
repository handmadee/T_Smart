class ValidateForm {
    validateEmail = (email) => {
        if (!email) {
            return false;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    validatePassword = (password = '') => {
        if (password.length < 6) {
            return false;
        }
        return true;
    };

    validateUsername = (username) => {
        if (username.length < 6) {
            return false;
        }
        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(username)) {
            return false;
        }
        return true;
    };

    validateNotEmpty = (text = '') => {
        return text.trim() !== '';
    };

}

export default new ValidateForm();