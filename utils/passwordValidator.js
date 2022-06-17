function passwordValidator(password) {
    if (password.length < 8) {
        return {
            success: false,
            message: "Password must be atleast 8 characters"
        }
    } else if (password.search(/[a-z]/) < 0) {
        return {
            success: false,
            message: "Password must contain atleast one lowercase letter"
        }
    } else if (password.search(/[A-Z]/) < 0) {
        return {
            success: false,
            message: "Password must contain atleast one uppercase letter"
        }
    } else if (password.search(/[0-9]/) < 0) {
        return {
            success: false,
            message: "Password must contain atleast one number"
        }
    } else if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
        return {
            success: false,
            message: "Password must contain atleast one special character"
        }
    } else {
        return {
            success: true,
            message: "Password Validated!"
        }
    }
  }

  module.exports = {passwordValidator};