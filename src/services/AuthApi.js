import API from "../config/DiaAxios";
import { getHeader } from "./Api";
const path = {
  LOGIN: "login",
  LOGIN_ADVANCE: "loginadvance",
  REGISTER: "register",
  VERIFY_ACCOUNT: "verifyAccount",
  REFRESH_TOKEN: "refreshToken",
};

export const login = async (data) => {
  try {
    const res = await API.post(path.LOGIN, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const loginAdvance = async (data) => {
  try {
    const res = await API.post(path.LOGIN_ADVANCE, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const register = async (data) => {
  try {
    const res = await API.post(path.REGISTER, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const verifyAccount = async (data) => {
  try {
    const res = await API.post(path.VERIFY_ACCOUNT, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const refreshToken = async (data) => {
  try {
    const res = await API.post(path.REFRESH_TOKEN, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};
