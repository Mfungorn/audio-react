import {
    IApi,
    ILoginModel,
    ILoginRequisites,
    IRegisterRequisites,
    IUserSession,
    IUserSessionJwtData
} from "./Api";
import {Album} from "../../domain/models/Album";
import {Genre} from "../../domain/models/Genre";
import {Track} from "../../domain/models/Track";
import {Author} from "../../domain/models/Author";
import {AxiosResponse} from "axios";

export class FakeApi implements IApi {
    async login(requisites: ILoginRequisites): Promise<any> {
        const jwtData = {
            email: "admin@gateway.org",
            id: 1
        } as IUserSessionJwtData;
        if (requisites.email !== jwtData.email ||
            requisites.password !== "123") {
            return Promise.reject();
        }
        const userSession = {
            accessToken: "fake-access-token",
            tokenType: "Bearer",
            id: jwtData.id,
            email: jwtData.email
        } as IUserSession;

        localStorage.setItem("session", JSON.stringify(userSession));
        const response = {
            accessToken: "accessToken",
            tokenType: "Bearer"
        } as ILoginModel;

        return Promise.resolve(response);
    }

    async register(requisites: IRegisterRequisites): Promise<any> {
        return Promise.resolve("Success");
    }

    async check(): Promise<any> {
        if (this.userSession) {
            return Promise.resolve();
        }
        return Promise.reject();
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

    fetchAlbum(id: number): Promise<AxiosResponse<Album>> {
        throw new Error("Not implemented")
    }

    fetchAlbumGenres(id: number): Promise<AxiosResponse<Genre[]>> {
        throw new Error("Not implemented")
    }

    fetchAlbumTracks(id: number): Promise<AxiosResponse<Track[]>> {
        throw new Error("Not implemented")
    }

    fetchAlbums(): Promise<AxiosResponse<Album[]>> {
        throw new Error("Not implemented")
    }

    fetchAuthor(id: number): Promise<AxiosResponse<Author>> {
        throw new Error("Not implemented")
    }

    fetchAuthorAlbums(id: number): Promise<AxiosResponse<Album[]>> {
        throw new Error("Not implemented")
    }

    fetchAuthorGenres(id: number): Promise<AxiosResponse<Genre[]>> {
        throw new Error("Not implemented")
    }

    fetchAuthorTracks(id: number): Promise<AxiosResponse<Track[]>> {
        throw new Error("Not implemented")
    }

    fetchAuthors(): Promise<AxiosResponse<Author[]>> {
        throw new Error("Not implemented")
    }

    fetchGenres(): Promise<AxiosResponse<Genre[]>> {
        throw new Error("Not implemented")
    }

    fetchPopularAlbums(): Promise<AxiosResponse<Album[]>> {
        throw new Error("Not implemented")
    }

    fetchPopularAuthors(): Promise<AxiosResponse<Author[]>> {
        throw new Error("Not implemented")
    }

    fetchPopularTracks(): Promise<AxiosResponse<Track[]>> {
        throw new Error("Not implemented")
    }

    fetchTrack(id: number): Promise<AxiosResponse<Track>> {
        throw new Error("Not implemented")
    }

    fetchTrackGenres(id: number): Promise<AxiosResponse<Genre[]>> {
        throw new Error("Not implemented")
    }

    fetchTracksByGenre(name: string): Promise<AxiosResponse<Track[]>> {
        throw new Error("Not implemented")
    }
}
