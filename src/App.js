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
import { PubNubProvider } from "pubnub-react";
import PubNub from "pubnub";

//import PageNotFound from './pages/PageNotFound';
const pubnub = new PubNub({
  publishKey: "pub-c-453976e7-6a8a-4614-871e-d4734b090efe",
  subscribeKey: "sub-c-729624f4-d3e8-4705-b0e9-d150ed42a116",
  uuid: "d4734b090efejwj89y7r837djewd938wekfjw0983",
});
class App extends Component {
  render() {
    return (
      <PubNubProvider client={pubnub}>
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

                <Route
                  exact
                  path="/account"
                  render={() => <Page page="account" />}
                />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
            <FullPageLoader />
            <GlobalErrorDialog />
          </PersistGate>
        </Provider>
      </PubNubProvider>
    );
  }
}

export default App;
