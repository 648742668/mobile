"use strict";

import Vue from 'vue';
import axios from "axios";
import { Notify } from 'vant';
import store from '@/store'
import qs from 'qs'
import {BASE_URL} from "../config/config";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: BASE_URL
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

//请求过滤器
_axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (store.getters.GET_TOKEN){
        config.headers['token'] = store.getters.GET_TOKEN
      }
      //重新定义数组序列化
      config.paramsSerializer = (params) =>{
        return qs.stringify(params,{arrayFormat: 'repeat'})
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
//响应过滤器
_axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
);

const request = (url, method, params, callback) => {

  const myconfig = {
    //前端后端通讯的接口
    url: url,
    method: method,
  }
  if (method === 'get') {
    myconfig.params = params
  } else {
    const formData = new FormData()
    for (let key in params) {
      if (params[key] instanceof Array){
        for(let i = 0 ; i < params[key].length ; i++){
          formData.append(key, params[key][i])
        }
      }else{
        formData.append(key, params[key])
      }
    }
    myconfig.data = formData
  }

  _axios.request(myconfig).then(response => {
    if (response.data.code === 20000) {
      callback(response.data)
    } else {
      Notify(response.data.message)
    }
  }).catch(error => {
    Notify(err)
  }).finally(() => {
  })
}

Vue.prototype.axios = _axios
Vue.prototype.request = request

Vue.prototype.get = (url, params, callback) => {
  request(url, 'get', params, response =>{
    callback(response.data)
  })
}

Vue.prototype.post = (url, params, callback) => {
  request(url, 'post', params,response =>{
    Notify(response.message)
    callback(response.data)
  })
}
