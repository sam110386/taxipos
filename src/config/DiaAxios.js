//import React,{Component} from 'react';
import axios from "axios";
import { store } from "../store/store";
import { refreshToken } from "../services/AuthApi";
import { REFRESH_TOKEN, SET_AUTH_ERROR } from "../store/actions/AuthAction";
import {
  START_PAGE_LOADER,
  STOP_PAGE_LOADER,
} from "../store/actions/GlobalActions";

var Constants = require("../config/Constants");

const instance = axios.create({
  baseURL: Constants.API_ENDPOINT,
});
instance.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "true",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

const requestHandler = (request) => {
  if (store.getState().auth.userLoggedIn)
    request.headers.Authorization = `Basic ${store.getState().auth.auth_token}`;
  return request;
};

const responseHandler = (response) => {
  return response;
};

const logoutUser = (message)=>{
  store.dispatch({
    type: SET_AUTH_ERROR,
    message: message
  });
}

const errorHandler = async (error) => {
  if (error.response && error.response.status === 400) {
    if (error.response.data && error.response.data.status === 0) {
      
      try {
        store.dispatch({
          type: START_PAGE_LOADER,
        });
        const res = await refreshToken({});
        store.dispatch({
          type: STOP_PAGE_LOADER,
        });
        if (res.status === 200 && res.data) {
          if (res.data.status === 1) {
            store.dispatch({
              type: REFRESH_TOKEN,
              token: res.data.auth_token,
            });
            window.location.reload();
          }
        }
      } catch (err) {
        store.dispatch({
          type: STOP_PAGE_LOADER,
        });
       logoutUser("Sorry! something went wrong please login again");
      }
    } else {
      store.dispatch({
        type: STOP_PAGE_LOADER,
      });
      logoutUser(error.response.data.message);
    }
  }else if(error.response && error.response.status === 402){
    logoutUser(error.response.data.message);
  }
  return Promise.reject(error);
};

instance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
instance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default instance;
