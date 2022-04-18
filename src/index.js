import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Page from "./templates/Page";
import ReactSEO from "react-seo";
import axios from "axios";
// import TagManager from 'react-gtm-module';
//new code added by vinod
/*const tagManagerArgs = {
    gtmId: 'AW-1035562125'
}
*/
//TagManager.initialize(tagManagerArgs)
//vinod code end here
ReactSEO.startMagic(
  [
    {
      url: "/triplog/",
      isFullMatch: false,
      ajaxFunction: Page,
      urlParams: [/(.+\/triplog\/|\/[^\/]+)/g],
    },
    
  ],
  renderDOMNew
);

function renderDOMNew() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

function ajaxFunction(param, resolve) {
  axios.get(`/api?param=${param}`).then((response) => {
    this.emit("gameDataIsInDaHouse");
    if (resolve)
      // IMPORTANT! call resolve only if it was passed.
      resolve();
  });
}
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
