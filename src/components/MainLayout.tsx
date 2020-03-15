import React from "react";
import {Box, Container} from "@material-ui/core";
import NavMenu from "./NavMenu/NavMenu";

const MainLayout: React.FC = props => {
    return (
        <Box>
            <NavMenu/>
            <Container>
                {props.children}
            </Container>
        </Box>
    )
};

export default MainLayout;
