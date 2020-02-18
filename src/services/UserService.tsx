import { handleResponse } from '../helpers/handleResponse';
import { authHeader } from '../helpers/authHeader';
import config from "../config/config";


export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}