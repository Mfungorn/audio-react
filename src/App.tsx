import React from "react";
import "./App.css";
import {BrowserRouter, Switch} from "react-router-dom";
import { Route } from "react-router";
import { Routes } from "./Routes";
import HomePage from "./components/HomePage";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import MainLayout from "./components/MainLayout";
import {LoginPage} from "./components/Login/LoginPage";
import {toast, ToastContainer} from "react-toastify";
import {FakeApi} from "./api/auth/FakeApi";
import 'react-toastify/dist/ReactToastify.css';
import Authorize from "./components/Authorization/Authorize";
import {AuthContext} from "./components/Authorization/AuthContext";
import {RegisterPage} from "./components/Register/RegisterPage";
import authApi from "./api/auth/AuthApi";


const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider value={authApi}>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <BrowserRouter>
            <Switch>
              <Route exact path={Routes.login} component={LoginPage} />
              <Route exact path={Routes.register} component={RegisterPage} />
              <Authorize>
                <MainLayout>
                  <Route exact path={Routes.home} component={HomePage} />
                </MainLayout>
              </Authorize>
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </MuiThemeProvider>
  );
}

export default App;
