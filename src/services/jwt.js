import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import { requires } from "./api";
import { getTokenFromCookie } from "../store/userStore";

export const jwtAxios = axios.create();

const cookies = new Cookies();
const refreshToken = async() => {
  try{
    const res = await requires.refreshToken();
    if(res.data.message === 'ok') {
      return res.data;
    }
  }catch(err) {
    console.log(err);
  }
};

jwtAxios.interceptors.request.use(
  async(config) => {
    const accessToken = getTokenFromCookie();
    console.log('check before send:',accessToken);
    const decodeToken = jwt_decode(accessToken);
    if(decodeToken.exp * 1000 < Date.now()) {
      const res = await refreshToken();
      console.log('get-token:', res.token);
      cookies.set('access-token', res.token, {path: '/'});
      config.headers['Authorization'] = `Bearer ${res.token}`;
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  }
);
