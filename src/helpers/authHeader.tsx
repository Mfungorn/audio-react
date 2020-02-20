import {USER} from "../context/AuthContext";

export const authHeader = () => {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem(USER));
    if (currentUser && currentUser.token) {
        return {Authorization: `Bearer ${currentUser.token}`};
    } else {
        return {};
    }
};