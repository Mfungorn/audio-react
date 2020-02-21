import {TOKEN} from "../services";

export const handleResponse = async response => {
    let text = await response.text();
    const data = text && JSON.parse(text);
    if (response.ok) {
        return data;
    } else {
        if ([401, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            localStorage.removeItem(TOKEN);
            window.location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
};