import validator from 'is_js';

const checkEmpty = (val, key) => {
    if (!val || validator.empty(val.trim())) {
        return `Please enter ${key}`;
    } else {
        return '';
    }
};

const checkMinLength = (val, minLength, key) => {
    if (val && val.trim().length < minLength) {
        return `Please enter a valid ${key}`;
    } else {
        return '';
    }
};

export default function (data, showToast) { 
    const { 
        fullName,
        userName,
        email,
        password,
        otp
    } = data;

    // Validate userName
    if (userName !== undefined) {
        let emptyValidationText = checkEmpty(userName, "User name");
        if (emptyValidationText !== '') {
            showToast(emptyValidationText); // Show error as a toast
            return; // Stop further validation
        } else {
            let minLenghtValidation = checkMinLength(userName, 3, "User name");
            if (minLenghtValidation !== '') {
                showToast(minLenghtValidation); // Show error as a toast
                return; // Stop further validation
            }
        }
    }

    // Validate fullName
    if (fullName !== undefined) {
        let emptyValidationText = checkEmpty(fullName, "Full name");
        if (emptyValidationText !== '') {
            showToast(emptyValidationText); // Show error as a toast
            return;
        } else {
            let minLenghtValidation = checkMinLength(fullName, 3, "Full name");
            if (minLenghtValidation !== '') {
                showToast(minLenghtValidation); // Show error as a toast
                return;
            }
        }
    }

    // Validate email
    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, "email");
        if (emptyValidationText !== '') {
            showToast(emptyValidationText); // Show error as a toast
            return;
        } else {
            if (!validator.email(email)) {
                showToast("Please enter a valid email"); // Show error as a toast
                return;
            }
        }
    }

    // Validate password
    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, "password");
        if (emptyValidationText !== '') {
            showToast(emptyValidationText); // Show error as a toast
            return;
        } else {
            let minLenghtValidation = checkMinLength(password, 6, "password");
            if (minLenghtValidation !== '') {
                showToast(minLenghtValidation); // Show error as a toast
                return;
            }
        }
    }

    // Validate otp
    if (otp !== undefined) {
        let emptyValidationText = checkEmpty(otp, "Otp");
        if (emptyValidationText !== '') {
            showToast(emptyValidationText); // Show error as a toast
            return;
        } else {
            let minLenghtValidation = checkMinLength(otp, 4, "Otp");
            if (minLenghtValidation !== '') {
                showToast(minLenghtValidation); // Show error as a toast
                return;
            }
        }
    }
}
