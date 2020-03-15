import React from "react";
import axiosGlobal from "axios";
import jwt_decode from "jwt-decode";

const axios = axiosGlobal.create();

axios.interceptors.request.use(
    config => {
        if (!config.headers.Authorization && authApi.userSession) {
            const userSession = authApi.userSession;
            config.headers.Authorization = `${userSession.tokenType} ${userSession.accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error.response)
);

export interface ILoginRequisites {
    email: string;
    password: string;
}

export interface IRegisterRequisites {
    name: string;
    email: string;
    password: string;
}

export interface ILoginModel {
    accessToken: string;
    tokenType: string;
}

export interface IUserSession {
    accessToken: string;
    tokenType: string;
    id: number;
    email: string;
}

export interface IUserSessionJwtData {
    email: string;
    id: number;
}

// Better move to env file later.
const backendUrl = "http://localhost:8080";

export interface IAuthApi {
    login: (requisites: ILoginRequisites) => Promise<any>;
    register: (requisites: IRegisterRequisites) => Promise<Response>;
    check: () => Promise<any>;
    clearSession: () => void;
    readonly userSession: IUserSession;
}

class AuthApi implements IAuthApi {
    // Type any to be discussed
    async login(requisites: ILoginRequisites): Promise<any> {
        const response = await axios.post<ILoginModel>(`${backendUrl}/auth/login`, {
            email: requisites.email,
            password: requisites.password
        });

        if (response.status < 400) {
            const jwtData = jwt_decode<IUserSessionJwtData>(response.data.accessToken);
            const userSession = {
                accessToken: response.data.accessToken,
                tokenType: response.data.tokenType,
                id: jwtData.id,
                email: jwtData.email
            } as IUserSession;
            console.log("AuthApi.userSession:", userSession);

            localStorage.setItem("session", JSON.stringify(userSession));
        }

        return new Promise(() => this.userSession);
    }

    async check(): Promise<boolean> {
        if (this.userSession) {
            const response = await axios.get<string>(`${backendUrl}/auth/check`);

            return Promise.resolve(response.status < 400);
        }
        return Promise.reject(false);
    }

    async register(requisites: IRegisterRequisites): Promise<Response> {
        return await axios.post(`${backendUrl}/auth/register/customer`, {
           name: requisites.name,
           email: requisites.email,
           password: requisites.password
        });
    }

    get userSession(): IUserSession {
        const userSessionJson = localStorage.getItem("session");
        return userSessionJson ? JSON.parse(userSessionJson) : null;
    }

    clearSession() {
        if (localStorage.getItem("session")) {
            localStorage.removeItem("session");
        }
    }
}

const authApi = new AuthApi();

export default authApi;
