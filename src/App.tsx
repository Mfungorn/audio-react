import React from "react";
import "./App.css";
import {BrowserRouter, Switch} from "react-router-dom";
import { Route } from "react-router";
import { Routes } from "./Routes";
import HomePage from "./components/HomePage";
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import MainLayout from "./components/MainLayout";
import {LoginPage} from "./components/Login/LoginPage";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Authorize from "./components/Authorization/Authorize";
import {ApiContext} from "./components/Authorization/ApiContext";
import {RegisterPage} from "./components/Register/RegisterPage";
import api from "./api/auth/Api";
import {AuthorPage} from "./components/Authors/AuthorPage";
import {AlbumPage} from "./components/Albums/AlbumPage";


const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <ApiContext.Provider value={api}>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <BrowserRouter>
            <Switch>
              <Route exact path={Routes.login} component={LoginPage} />
              <Route exact path={Routes.register} component={RegisterPage} />
              <Authorize>
                <MainLayout>
                  <Route exact path={Routes.home} component={HomePage} />
                  <Route path={Routes.author} component={AuthorPage} />
                  <Route path={Routes.album} component={AlbumPage} />
                </MainLayout>
              </Authorize>
            </Switch>
          </BrowserRouter>
        </ApiContext.Provider>
      </MuiThemeProvider>
  );
}

export default App;
