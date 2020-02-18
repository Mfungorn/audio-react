import config from "../config/config";


export const registrationService = {
    register
};

function register(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions)
}