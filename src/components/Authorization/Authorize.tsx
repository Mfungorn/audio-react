import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Routes} from "../../Routes";
import {useAuth} from "./AuthContext";

const Authorize: React.FC = props => {
    const auth = useAuth();
    const [isAuthorized, setAuthorizedState] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const userSession = auth.userSession;
        if (userSession) {
            auth
                .check()
                .then(() => {
                    setAuthorizedState(true);
                })
                .catch(() => {
                    auth.clearSession();
                    history.push(Routes.login);
                })
        } else {
            history.push(Routes.login);
        }
    });

    return <>{isAuthorized? props.children : null}</>
};

export default Authorize;
