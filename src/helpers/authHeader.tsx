import {TOKEN} from "../context/AuthContext";

export const authHeader = () => {
    // return authorization header with jwt token
    const token = localStorage.getItem(TOKEN);
    if (token) {
        const tokenJson = JSON.parse(token);
        if (tokenJson.accessToken) {
            return {Authorization: `${tokenJson.tokenType} ${tokenJson.accessToken}`};
        } else {
            return {};
        }
    } else
        return {}
};
