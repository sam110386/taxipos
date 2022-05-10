import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Page from "./templates/Page";
//import Dispatcher from "./templates/Dispatcher";
import SimplePage from "./templates/SimplePage";
import { store, persistor } from "./store/store";
import { FullPageLoader } from "./blocks/Loaders";
import { GlobalErrorDialog } from "./blocks/Dialogs";
import { Toaster } from "react-hot-toast";

//import PageNotFound from './pages/PageNotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <Toaster />
          </div>
          <Router basename={`${process.env.PUBLIC_URL}/`}>
            <Switch>
              <Route exact path="/" render={() => <Page page="homepage" />} />
              
              <Route
                exact
                path="/login"
                render={() => <SimplePage page="login" />}
              />
              
              <Route
                exact
                path="/dispatcher/triplog"
                render={() => <Page page="triplog" />}
              />
              
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
          <FullPageLoader />
          <GlobalErrorDialog />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
