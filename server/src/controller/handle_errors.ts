export default function handleErrors (err: any) {
    let errors = {email: '', password: ''};

    if (err.message === 'wrong email'){
        errors.email = 'Email not registered.';
    };  

    if (err.message === 'wrong password'){
        errors.password = 'Password incorrect.';
    }

    return errors;
}