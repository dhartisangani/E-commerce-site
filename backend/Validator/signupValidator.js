const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function singupValidator(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username)
        ? validator.trim(data.username)
        : "";
    data.email = !isEmpty(data.email) ? validator.trim(data.email) : "";
    data.password = !isEmpty(data.password) ? validator.trim(data.password) : "";

    if (validator.isEmpty(data.username)) {
        errors.firstname = "First name is required.";
    } else if (!validator.isLength(data.username, { min: 3 })) {
        errors.username = "First name must be at least 3 characters.";
    } else if (!validator.isLength(data.username, { max: 50 })) {
        errors.username = "First name may not be grater then 50 characters.";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required.";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email address is not valid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required.";
    } else if (
        !validator.isStrongPassword(data.password, [
            {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
        ])
    ) {
        errors.password =
            "Password must be at least 8 characters, with min 1 lowercase, min 1 uppercase, 1 number and 1 symbol";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};