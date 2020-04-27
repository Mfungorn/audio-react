import React, {useContext} from "react";
import api, {IApi} from "./Api";

export const ApiContext = React.createContext<IApi>(api);
export const useApi = () => useContext(ApiContext);
