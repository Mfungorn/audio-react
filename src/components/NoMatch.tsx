import * as React from 'react'
import {useLocation} from "react-router";


export const NoMatch = () => {
    let location = useLocation();

    return (
        <div>
            <h3>No match for <code>{location.pathname}</code></h3>
        </div>
    );
};