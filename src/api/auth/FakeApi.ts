import {
    IAuthApi,
    ILoginModel,
    ILoginRequisites,
    IRegisterRequisites,
    IUserSession,
    IUserSessionJwtData
} from "./AuthApi";

export class FakeApi implements IAuthApi {
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
}
