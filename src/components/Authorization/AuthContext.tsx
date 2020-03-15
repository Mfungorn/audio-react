import React, {useContext} from "react";
import {IAuthApi} from "../../api/auth/AuthApi";
import {FakeApi} from "../../api/auth/FakeApi";

export const AuthContext = React.createContext<IAuthApi>(new FakeApi());
export const useAuth = () => useContext(AuthContext);
