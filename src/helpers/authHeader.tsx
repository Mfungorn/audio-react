import {TOKEN} from "../context/AuthContext";

export const authHeader = () => {
    // return authorization header with jwt token
    const token = JSON.parse(localStorage.getItem(TOKEN));
    if (token && token.accessToken) {
        return {Authorization: `${token.tokenType} ${token.accessToken}`};
    } else {
        return {};
    }
};