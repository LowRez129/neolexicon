"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrors(err) {
    let errors = { email: '', password: '' };
    if (err.message === 'wrong email') {
        errors.email = 'Email does not exist.';
    }
    ;
    if (err.message === 'wrong password') {
        errors.password = 'Password incorrect.';
    }
    return errors;
}
exports.default = handleErrors;
