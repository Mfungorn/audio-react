import React, {useContext} from "react";
import api, {IApi} from "../../api/auth/Api";
import {FakeApi} from "../../api/auth/FakeApi";

export const ApiContext = React.createContext<IApi>(api);
export const useApi = () => useContext(ApiContext);
