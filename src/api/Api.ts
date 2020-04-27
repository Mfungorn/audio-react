import axiosGlobal, {AxiosResponse} from "axios";
import jwt_decode from "jwt-decode";
import {Author} from "../domain/models/Author";
import {Album} from "../domain/models/Album";
import {Track} from "../domain/models/Track";
import {Genre} from "../domain/models/Genre";
import {Profile} from "../domain/models/Profile";

const axios = axiosGlobal.create();

axios.interceptors.request.use(
    config => {
        if (!config.headers.Authorization && api.userSession) {
            const userSession = api.userSession;
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

export interface IApi {
    login: (requisites: ILoginRequisites) => Promise<any>;
    register: (requisites: IRegisterRequisites) => Promise<Response>;
    check: () => Promise<any>;
    clearSession: () => void;
    readonly userSession: IUserSession;

    fetchProfile: () => Promise<AxiosResponse<Profile>>;

    fetchAuthors: () => Promise<AxiosResponse<Author[]>>;
    fetchPopularAuthors: () => Promise<AxiosResponse<Author[]>>;
    fetchAuthor: (id: number) => Promise<AxiosResponse<Author>>;
    fetchAuthorAlbums: (id: number) => Promise<AxiosResponse<Album[]>>;
    fetchAuthorTracks: (id: number) => Promise<AxiosResponse<Track[]>>;
    fetchAuthorGenres: (id: number) => Promise<AxiosResponse<Genre[]>>;

    fetchPopularAlbums: () => Promise<AxiosResponse<Album[]>>;
    fetchAlbum: (id: number) => Promise<AxiosResponse<Album>>;
    fetchAlbumTracks: (id: number) => Promise<AxiosResponse<Track[]>>;

    fetchPopularTracks: () => Promise<AxiosResponse<Track[]>>;
    fetchTrack: (id: number) => Promise<AxiosResponse<Track>>;

    fetchGenres: () => Promise<AxiosResponse<Genre[]>>;
    fetchTracksByGenre: (name: string) => Promise<AxiosResponse<Track[]>>;
}

class Api implements IApi {
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
            console.log("Api.userSession:", userSession);

            localStorage.setItem("session", JSON.stringify(userSession));

            const model = {
                tokenType: response.data.tokenType,
                accessToken: response.data.accessToken
            } as ILoginModel;
            console.log("Api.model:", model);

            return Promise.resolve(model)
        } else {
            return Promise.reject(response.statusText)
        }
    }

    async check(): Promise<boolean> {
        if (this.userSession) {
            const response = await axios.get<string>(`${backendUrl}/auth/check`);

            return Promise.resolve(response.status < 400);
        }
        return Promise.reject(false);
    }

    async register(requisites: IRegisterRequisites): Promise<Response> {
        return axios.post(`${backendUrl}/auth/register/customer`, {
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

    fetchProfile(): Promise<AxiosResponse<Profile>> {
        return axios.get<Profile>(`${backendUrl}/user/profile`)
    }

    fetchAuthors(): Promise<AxiosResponse<Author[]>> {
        return axios.get<Author[]>(`${backendUrl}/authors/all`)
    }

    fetchPopularAuthors(): Promise<AxiosResponse<Author[]>> {
        return axios.get<Author[]>(`${backendUrl}/authors/popular`)
    }

    fetchAuthor(id: number): Promise<AxiosResponse<Author>> {
        return axios.get<Author>(`${backendUrl}/authors/${id}`)
    }

    fetchAuthorAlbums(id: number): Promise<AxiosResponse<Album[]>> {
        return axios.get<Album[]>(`${backendUrl}/authors/${id}/albums`)
    }

    fetchAuthorTracks(id: number): Promise<AxiosResponse<Track[]>> {
        return axios.get<Track[]>(`${backendUrl}/authors/${id}/compositions`)
    }

    fetchAuthorGenres(id: number): Promise<AxiosResponse<Genre[]>> {
        return axios.get<Genre[]>(`${backendUrl}/authors/${id}/genres`)
    }

    fetchPopularAlbums(): Promise<AxiosResponse<Album[]>> {
        return axios.get<Album[]>(`${backendUrl}/albums/popular`)
    }

    fetchAlbum(id: number): Promise<AxiosResponse<Album>> {
        return axios.get<Album>(`${backendUrl}/albums/${id}`)
    }

    fetchAlbumTracks(id: number): Promise<AxiosResponse<Track[]>> {
        return axios.get<Track[]>(`${backendUrl}/albums/${id}/compositions`)
    }

    fetchPopularTracks(): Promise<AxiosResponse<Track[]>> {
        return axios.get<Track[]>(`${backendUrl}/compositions/popular`)
    }

    fetchTrack(id: number): Promise<AxiosResponse<Track>> {
        return axios.get<Track>(`${backendUrl}/compositions/${id}`)
    }

    fetchGenres(): Promise<AxiosResponse<Genre[]>> {
        return axios.get<Genre[]>(`${backendUrl}/genres/all`)
    }

    fetchTracksByGenre(name: string): Promise<AxiosResponse<Track[]>> {
        return axios.get<Track[]>(`${backendUrl}/${name}/compositions`)
    }
}

const api = new Api();

export default api;
